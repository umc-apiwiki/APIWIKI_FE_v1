'use client'
import React, { useRef, useState, useEffect } from 'react'

interface BookmarkCarouselProps {
  date: string
  children: React.ReactNode
}

export default function BookmarkCarousel({ date, children }: BookmarkCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [indicatorX, setIndicatorX] = useState(0)

  // 드래그 상태 관리
  const [isDragActive, setIsDragActive] = useState(false)
  const [activeTarget, setActiveTarget] = useState<'handle' | 'content' | null>(null)

  const isDragging = useRef(false)
  const dragTarget = useRef<'handle' | 'content' | null>(null)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const startIndicatorX = useRef(0)
  const hasDraggedRef = useRef(false) // 이벤트 핸들러에서 즉시 사용할 ref
  const clickTimeoutRef = useRef<number | null>(null)

  const MAX_MOVE = 24
  const DRAG_THRESHOLD = 5 // 드래그로 인식하기 위한 최소 이동 거리 (px)

  // [Lint 해결] document.body 직접 수정을 useEffect로 이동
  useEffect(() => {
    if (isDragActive) {
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.userSelect = ''
    }
    return () => {
      document.body.style.userSelect = ''
      // 컴포넌트 언마운트 시 타임아웃 정리
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current)
      }
    }
  }, [isDragActive])

  const handleScroll = () => {
    if (!scrollRef.current || dragTarget.current === 'handle') return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) setIndicatorX((scrollLeft / maxScroll) * MAX_MOVE)
  }

  const onDragStart = (e: React.MouseEvent, target: 'handle' | 'content') => {
    isDragging.current = true
    hasDraggedRef.current = false // ref 초기화

    // 기존 타임아웃 취소
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
      clickTimeoutRef.current = null
    }

    setIsDragActive(true)
    setActiveTarget(target)
    dragTarget.current = target
    startX.current = e.clientX
    if (scrollRef.current) startScrollLeft.current = scrollRef.current.scrollLeft
    startIndicatorX.current = indicatorX

    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
    document.addEventListener('mouseleave', onDragEnd)
  }

  const onDragMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const deltaX = e.clientX - startX.current

    // 드래그 threshold 체크: 일정 거리 이상 움직였을 때만 드래그로 인식
    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      hasDraggedRef.current = true // ref 즉시 업데이트
    }

    // 실제 드래그가 발생했을 때만 스크롤 이동
    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      if (dragTarget.current === 'handle') {
        const newX = Math.max(0, Math.min(startIndicatorX.current + deltaX, MAX_MOVE))
        setIndicatorX(newX)
        const { scrollWidth, clientWidth } = scrollRef.current
        scrollRef.current.scrollLeft = (newX / MAX_MOVE) * (scrollWidth - clientWidth)
      } else {
        scrollRef.current.style.scrollBehavior = 'auto'
        scrollRef.current.scrollLeft = startScrollLeft.current - deltaX
      }
    }
  }

  const onDragEnd = () => {
    const wasDragging = hasDraggedRef.current

    isDragging.current = false
    setIsDragActive(false)
    setActiveTarget(null)
    dragTarget.current = null
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth'

    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
    document.removeEventListener('mouseleave', onDragEnd)

    // 드래그가 발생했다면 클릭 이벤트가 완전히 처리될 때까지 충분한 시간 대기
    if (wasDragging) {
      // ref는 즉시 초기화하지 않고 조금 더 유지
      clickTimeoutRef.current = setTimeout(() => {
        hasDraggedRef.current = false
        clickTimeoutRef.current = null
      }, 200)
    } else {
      hasDraggedRef.current = false
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col gap-4 xs:gap-5 md:gap-6 w-full mb-6 xs:mb-8 md:mb-10">
      <div className="text-sky-900 text-base xs:text-lg md:text-xl lg:text-2xl font-medium pl-4 lg:pl-0">
        {date}
      </div>
      <div
        ref={scrollRef}
        onMouseDown={(e) => onDragStart(e, 'content')}
        onClickCapture={(e) => {
          // 캡처 단계에서 차단 (자식 요소보다 먼저 실행)
          if (hasDraggedRef.current) {
            e.preventDefault()
            e.stopPropagation()
            return false
          }
        }}
        // ✅ [핵심] 여기서 기본 드래그 막음 (로고 드래그 시 스크롤 되도록)
        onDragStart={(e) => e.preventDefault()}
        className={`flex gap-4 xs:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-3 xs:pb-4 pr-4 xs:pr-6 md:pr-10 px-4 lg:px-0 no-scrollbar select-none ${
          isDragActive && activeTarget === 'content' ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
        }}
      >
        {children}
      </div>
      <div className="w-full flex justify-center mt-1 xs:mt-2 pr-4 xs:pr-6 md:pr-10">
        <div
          className={`relative w-16 xs:w-20 h-5 xs:h-6 flex items-center justify-center ${
            isDragActive && activeTarget === 'handle' ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={(e) => onDragStart(e, 'handle')}
        >
          <div className="relative w-full mt-1 pointer-events-none">
            <div className="absolute inset-0 w-full h-0.5 xs:h-1 bg-[#D9D9D9] rounded-3xl" />
            <div
              className="absolute inset-0 w-[70%] h-0.5 xs:h-1 bg-brand-500 rounded-3xl"
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
