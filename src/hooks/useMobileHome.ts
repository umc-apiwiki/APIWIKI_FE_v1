/**
 * MobileHomePage 전용 Custom Hook
 * 로직과 뷰를 분리하여 모든 상태 관리 및 비즈니스 로직 처리
 */

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MobileAPI, MobileNewsItem } from '../types/api'
import { getPopularApis, getSuggestedApis, getCategories } from '../services/mobile'

type UseMobileHomeReturn = {
  // 상태
  scrollProgress: number
  isSearchModalOpen: boolean
  isActive: boolean
  popularAPIs: MobileAPI[]
  suggestedAPIs: MobileAPI[]
  newsItems: MobileNewsItem[]
  categories: string[]
  // Refs
  scrollRef: React.RefObject<HTMLDivElement | null>
  scrollContentRef: React.RefObject<HTMLDivElement | null>
  // 핸들러
  handleScroll: () => void
  handleScrollToTop: () => void
  handleCategoryClick: (category: string) => void
  setIsSearchModalOpen: (isOpen: boolean) => void
  setIsActive: (isActive: boolean) => void
}

export const useMobileHome = (): UseMobileHomeReturn => {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollContentRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [popularAPIs, setPopularAPIs] = useState<MobileAPI[]>([])
  const [suggestedAPIs, setSuggestedAPIs] = useState<MobileAPI[]>([])
  const [newsItems, setNewsItems] = useState<MobileNewsItem[]>([])
  const [categories, setCategories] = useState<string[]>([])

  // 데이터 페칭
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제 API 호출
        const [popularData, suggestedData, categoriesData] = await Promise.all([
          getPopularApis(4),
          getSuggestedApis(4),
          getCategories(),
        ])

        // ApiPreview를 MobileAPI로 변환
        setPopularAPIs(
          popularData.map((api) => ({
            id: api.apiId,
            name: api.name,
            description: api.summary,
            logo: api.logo,
            rating: api.avgRating,
            users: `${api.viewCounts}`,
            price: api.pricingType?.toLowerCase() as 'free' | 'paid' | 'mixed',
          }))
        )

        setSuggestedAPIs(
          suggestedData.map((api) => ({
            id: api.apiId,
            name: api.name,
            description: api.summary,
            logo: api.logo,
            rating: api.avgRating,
            users: `${api.viewCounts}`,
            price: api.pricingType?.toLowerCase() as 'free' | 'paid' | 'mixed',
          }))
        )

        setCategories(categoriesData)

        // Mock news data (뉴스 API가 없으므로 임시 데이터)
        setNewsItems([
          {
            id: '1',
            title: '구글 중국의 비아냐, 2025 경쟁력까지 재발견',
            content: '서울특별 라디오 나우어 모바일',
            author: '서울특별 라디오 | 나우어 모바일',
            date: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'AI가 코드 짜는 시대, 개발자와 역할과 이름은 다시 묻다',
            content: '서울특별 라디오 나우어 모바일',
            author: '서울특별 라디오 | 나우어 모바일',
            date: new Date().toISOString(),
          },
          {
            id: '3',
            title: '대기업 공무원 이젠 예약은... 영어학당의 IT개발자들',
            content: '서울특별 라디오 나우어 모바일',
            author: '서울특별 라디오 | 나우어 모바일',
            date: new Date().toISOString(),
          },
          {
            id: '4',
            title: 'NIA-경기도경제과학진흥원...',
            content: '서울특별 라디오 나우어 모바일',
            author: '서울특별 라디오 | 나우어 모바일',
            date: new Date().toISOString(),
          },
        ])
      } catch (error) {
        console.error('Error fetching mobile home data:', error)
      }
    }

    fetchData()
  }, [])

  // 스크롤 진행률 계산
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      const maxScroll = scrollWidth - clientWidth
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
    }
  }

  // 상단 스크롤 활성화
  const handleScrollToTop = () => {
    setIsActive(true)
  }

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    navigate(`/explore?category=${encodeURIComponent(category)}`)
  }

  // 맨 위에서 pull-down 동작 감지
  useEffect(() => {
    if (!isActive || !scrollContentRef.current) return

    let startY = 0
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      if (!scrollContentRef.current) return
      const scrollTop = scrollContentRef.current.scrollTop

      if (scrollTop === 0) {
        startY = e.touches[0].clientY
        isDragging = true
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || !scrollContentRef.current) return

      const scrollTop = scrollContentRef.current.scrollTop
      const currentY = e.touches[0].clientY
      const deltaY = currentY - startY

      if (scrollTop === 0 && deltaY > 50) {
        setIsActive(false)
        isDragging = false
      }
    }

    const handleTouchEnd = () => {
      isDragging = false
      startY = 0
    }

    const scrollElement = scrollContentRef.current
    scrollElement.addEventListener('touchstart', handleTouchStart)
    scrollElement.addEventListener('touchmove', handleTouchMove)
    scrollElement.addEventListener('touchend', handleTouchEnd)

    return () => {
      scrollElement.removeEventListener('touchstart', handleTouchStart)
      scrollElement.removeEventListener('touchmove', handleTouchMove)
      scrollElement.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isActive])

  return {
    scrollProgress,
    isSearchModalOpen,
    isActive,
    popularAPIs,
    suggestedAPIs,
    newsItems,
    categories,
    scrollRef,
    scrollContentRef,
    handleScroll,
    handleScrollToTop,
    handleCategoryClick,
    setIsSearchModalOpen,
    setIsActive,
  }
}
