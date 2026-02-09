'use client'
import React, { useRef, useState, useEffect } from 'react'

interface BookmarkCarouselProps {
  date: string
  children: React.ReactNode
}

export default function BookmarkCarousel({ date, children }: BookmarkCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [indicatorX, setIndicatorX] = useState(0)

  const isDragging = useRef(false)
  const dragTarget = useRef<'handle' | 'content' | null>(null)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const startIndicatorX = useRef(0)

  const MAX_MOVE = 24

  // 카드 위에서 휠을 굴릴 때 가로 스크롤로 강제 전환
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  const handleScroll = () => {
    if (!scrollRef.current || dragTarget.current === 'handle') return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) setIndicatorX((scrollLeft / maxScroll) * MAX_MOVE)
  }

  const onDragStart = (e: React.MouseEvent, target: 'handle' | 'content') => {
    isDragging.current = true
    dragTarget.current = target
    startX.current = e.clientX
    if (scrollRef.current) startScrollLeft.current = scrollRef.current.scrollLeft
    startIndicatorX.current = indicatorX

    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
  }

  const onDragMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const deltaX = e.clientX - startX.current

    if (dragTarget.current === 'handle') {
      let newX = Math.max(0, Math.min(startIndicatorX.current + deltaX, MAX_MOVE))
      setIndicatorX(newX)
      const { scrollWidth, clientWidth } = scrollRef.current
      scrollRef.current.scrollLeft = (newX / MAX_MOVE) * (scrollWidth - clientWidth)
    } else {
      // ✅ 드래그 중에는 부드러운 스크롤을 끄고 즉시 이동 (ref로 직접 제어)
      scrollRef.current.style.scrollBehavior = 'auto'
      scrollRef.current.scrollLeft = startScrollLeft.current - deltaX
    }
  }

  const onDragEnd = () => {
    isDragging.current = false
    dragTarget.current = null

    // ✅ 드래그 끝나면 다시 부드럽게 복구
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth'
    }

    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full mb-10">
      <div className="text-sky-900 text-2xl font-medium pl-4 lg:pl-0">{date}</div>
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={(e) => onDragStart(e, 'content')}
        className={`flex gap-10 overflow-x-auto pb-4 pr-10 px-4 lg:px-0 no-scrollbar select-none ${
          isDragging.current && dragTarget.current === 'content' ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
        }}
      >
        {children}
      </div>
      <div className="w-full flex justify-center mt-2 pr-10">
        <div
          className="relative w-20 h-6 flex items-center justify-center cursor-pointer"
          onMouseDown={(e) => onDragStart(e, 'handle')}
        >
          <div className="relative w-20 mt-1 pointer-events-none">
            <div className="absolute inset-0 w-20 h-1 bg-[#D9D9D9] rounded-3xl" />
            <div
              className="absolute inset-0 w-14 h-1 bg-brand-500 rounded-3xl"
              style={{
                transform: `translateX(${indicatorX}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
