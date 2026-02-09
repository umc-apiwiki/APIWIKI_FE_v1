import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '@/components/HomePage/SearchBar'
import IntroSection from '@/components/HomePage/IntroSection'
import SearchTagSection from '@/components/HomePage/SearchTagSection'
import BottomButtonSection from '@/components/HomePage/BottomButtonSection'
import APICardSmall from '@/components/APICardSmall'
import NewsCard from '@/components/NewsCard'
import type { ApiPreview } from '@/types/api'
import { useApiList } from '@/hooks'

// -------------------- 1. 타겟 설정 (실제 매칭 + 목데이터 정보 포함) --------------------

interface TargetConfig {
  dbName: string // DB 매칭용 이름
  localImage: string // 로컬 이미지 경로
  fallbackTitle: string // 매칭 실패 시 보여줄 제목 (Mock)
  // 👇 DB에 없을 때 보여줄 가짜 데이터 정보
  mockRating: number
  mockReviews: number
  mockPrice: string
}

// ✅ [Recent Popular] 4개는 실제 연결, Gmail은 목데이터
const TARGET_POPULAR: TargetConfig[] = [
  {
    dbName: 'Youtube API', // 알려주신 DB 이름
    localImage: '/images/YouTube.svg',
    fallbackTitle: 'YouTube',
    mockRating: 4.8,
    mockReviews: 1240,
    mockPrice: 'Free',
  },
  {
    dbName: 'OpenStreetMap', // 알려주신 DB 이름
    localImage: '/images/OpenStreetMap.svg',
    fallbackTitle: 'OpenStreetMap',
    mockRating: 4.1,
    mockReviews: 850,
    mockPrice: 'Mixed',
  },
  {
    dbName: 'Google Login', // 알려주신 DB 이름
    localImage: '/images/Google Login.svg',
    fallbackTitle: 'Google Login',
    mockRating: 4.7,
    mockReviews: 2100,
    mockPrice: 'Free',
  },
  {
    dbName: 'OpenAI GPT-4', // 알려주신 DB 이름
    localImage: '/images/Open AI.svg',
    fallbackTitle: 'Open AI',
    mockRating: 4.9,
    mockReviews: 3400,
    mockPrice: 'Paid',
  },
  {
    dbName: 'Gmail_Fake', // DB에 없으므로 매칭 안됨 -> 목데이터 사용
    localImage: '/images/Gmail.svg',
    fallbackTitle: 'Gmail',
    mockRating: 4.6,
    mockReviews: 540,
    mockPrice: 'Free', // 가짜 데이터
  },
]

// ✅ [Suggest API] 아직 DB에 없으므로 전량 목데이터 정보 입력
const TARGET_SUGGEST: TargetConfig[] = [
  {
    dbName: 'Map_Fake_1',
    localImage: '/images/국토부 2D지도API.svg',
    fallbackTitle: '국토부 2D지도',
    mockRating: 4.3,
    mockReviews: 120,
    mockPrice: 'Free',
  },
  {
    dbName: 'Naver_Fake',
    localImage: '/images/Naver.svg',
    fallbackTitle: 'Naver',
    mockRating: 4.5,
    mockReviews: 890,
    mockPrice: 'Mixed',
  },
  {
    dbName: 'KakaoPay_Fake',
    localImage: '/images/카카오페이.svg',
    fallbackTitle: '카카오페이',
    mockRating: 4.2,
    mockReviews: 320,
    mockPrice: 'Free',
  },
  {
    dbName: 'AWS_Fake',
    localImage: '/images/AWS API.svg',
    fallbackTitle: 'AWS API',
    mockRating: 4.8,
    mockReviews: 1500,
    mockPrice: 'Paid',
  },
  {
    dbName: 'NaverMap_Fake',
    localImage: '/images/네이버지도.svg',
    fallbackTitle: '네이버 지도',
    mockRating: 4.4,
    mockReviews: 670,
    mockPrice: 'Paid',
  },
]

// -------------------- 2. 뉴스 데이터 (이미지 경로 수정됨) --------------------
interface NewsData {
  title: string
  publisher: string
  thumb: string
}

const newsItems: NewsData[] = [
  {
    title: '"쿠팡 중국인 피의자, 20년 경력개발자 위 개발자"',
    publisher: '/images/더중앙.svg', // 수정됨: 더중앙
    thumb: '/images/쿠팡 중국인.svg',
  },
  {
    title: 'AI가 코드 짜는 시대, 개발자의 역할은...',
    publisher: '/images/잇월드.svg', // 수정됨: 잇월드
    thumb: '/images/AI.svg',
  },
  {
    title: '"대기업 꿈꾸다 이젠 해외로"',
    publisher: '/images/노컷뉴스.svg', // 수정됨: 노컷뉴스
    thumb: '/images/대기업.svg',
  },
  {
    title: 'NIA-경기도경제과학진흥원, 업무협약',
    publisher: '/images/경북신문.svg', // 수정됨: 경북신문
    thumb: '/images/NIA.svg',
  },
  {
    title: '업스테이지, 일본 AI시장 공략',
    publisher: '/images/더일렉.svg', // 수정됨: 더일렉
    thumb: '/images/업스테이지.svg',
  },
]

// -------------------- 3. ScrollableSection (드래그 & 휠 기능 통합 수정됨) --------------------
const ScrollableSection = ({
  title,
  data,
  type,
}: {
  title: string
  data: ApiPreview[] | NewsData[]
  type: 'api' | 'news'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [indicatorX, setIndicatorX] = useState(0)

  // 드래그 상태 관리 (핸들과 컨텐츠 영역 통합 관리)
  const isDragging = useRef(false)
  const dragTarget = useRef<'handle' | 'content' | null>(null)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const startIndicatorX = useRef(0)

  const MAX_MOVE = 24

  // 1. [휠 스크롤] 카드 영역에서 휠을 굴리면 가로로 이동
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      // 위아래 휠(deltaY)을 가로 스크롤값에 더해줌
      scrollRef.current.scrollLeft += e.deltaY
    }
  }

  // 2. [스크롤 동기화] 컨텐츠가 스크롤되면 하단 핸들 위치 업데이트
  const handleScroll = () => {
    if (!scrollRef.current || dragTarget.current === 'handle') return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll > 0) {
      setIndicatorX((scrollLeft / maxScroll) * MAX_MOVE)
    }
  }

  // 3. [드래그 시작] 핸들 또는 카드 영역 클릭 시
  const onDragStart = (e: React.MouseEvent, target: 'handle' | 'content') => {
    isDragging.current = true
    dragTarget.current = target
    startX.current = e.clientX
    if (scrollRef.current) startScrollLeft.current = scrollRef.current.scrollLeft
    startIndicatorX.current = indicatorX

    document.body.style.userSelect = 'none' // 드래그 중 텍스트 선택 방지
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener('mouseup', onDragEnd)
  }

  // 4. [드래그 중] 움직임 계산
  const onDragMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    const deltaX = e.clientX - startX.current

    if (dragTarget.current === 'handle') {
      // 스크롤바 핸들 드래그 시
      let newX = Math.max(0, Math.min(startIndicatorX.current + deltaX, MAX_MOVE))
      setIndicatorX(newX)
      const { scrollWidth, clientWidth } = scrollRef.current
      scrollRef.current.scrollLeft = (newX / MAX_MOVE) * (scrollWidth - clientWidth)
    } else {
      // 카드 컨텐츠 영역 드래그 시 (마우스 방향대로 스크롤)
      // 드래그 중에는 smooth behavior를 잠시 꺼야 손가락을 잘 따라옵니다.
      scrollRef.current.style.scrollBehavior = 'auto'
      scrollRef.current.scrollLeft = startScrollLeft.current - deltaX
    }
  }

  // 5. [드래그 종료]
  const onDragEnd = () => {
    isDragging.current = false
    dragTarget.current = null
    if (scrollRef.current) scrollRef.current.style.scrollBehavior = 'smooth'
    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mouseup', onDragEnd)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [])

  if (!data || data.length === 0) return null

  return (
    <div className="w-full max-w-[1444px] mx-auto flex flex-col mb-12 animate-fade-in px-4">
      <div className="w-full mb-6">
        <div className="justify-start text-black/60 text-2xl font-medium font-['Pretendard_Variable']">
          {title}
        </div>
      </div>

      {/* 카드 리스트 영역: 휠 스크롤 및 카드 드래그 이벤트 연결 */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={(e) => onDragStart(e, 'content')}
        className={`flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth ${
          isDragging.current && dragTarget.current === 'content' ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {type === 'api'
          ? (data as ApiPreview[]).map((api, index) => (
              <APICardSmall key={api.apiId || index} {...api} />
            ))
          : (data as NewsData[]).map((news, i) => (
              <NewsCard
                key={i}
                title={news.title}
                publisherLogoUrl={news.publisher}
                thumbnailUrl={news.thumb}
              />
            ))}
      </div>

      {/* 하단 스크롤바 디자인 */}
      <div className="w-full flex justify-center mt-2">
        <div
          className="relative w-20 h-6 flex items-center justify-center cursor-pointer"
          onMouseDown={(e) => onDragStart(e, 'handle')}
        >
          <div className="relative w-20 mt-1 pointer-events-none">
            <div className="absolute inset-0 w-20 h-1 bg-[#D9D9D9] rounded-3xl" />
            <div
              className="absolute inset-0 w-14 h-1 bg-brand-500 rounded-3xl z-15 transition-transform duration-100 ease-out"
              style={{ transform: `translateX(${indicatorX}px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// -------------------- 4. HomePage Component --------------------

const HomePage = () => {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const { data: serverData, fetchApiList } = useApiList()

  useEffect(() => {
    fetchApiList({ sort: 'POPULAR', size: 100 })
  }, [fetchApiList])

  // ✅ [핵심 로직] 데이터 합치기 (실제 DB에 있으면 그거 쓰고, 없으면 Mock 데이터 생성)
  const mergeData = (targets: TargetConfig[], fetchedList: ApiPreview[] = []) => {
    return targets.map((target) => {
      // 1. 이름으로 DB 매칭 시도
      const realData = fetchedList.find((item) => item.name === target.dbName)

      // 2. 매칭 성공: 실제 데이터 + 로컬 이미지
      if (realData) {
        return {
          ...realData,
          logo: target.localImage,
        }
      }

      // 3. 매칭 실패(DB에 없음): 우리가 설정한 "예쁜 목데이터" 반환
      return {
        apiId: 0, // 0번 ID (클릭 시 동작은 하지만 빈 페이지일 수 있음)
        name: target.fallbackTitle,
        summary: '주요 기능을 제공하는 인기 API입니다.', // 임의 설명
        avgRating: target.mockRating,
        reviewCount: target.mockReviews,
        viewCounts: target.mockReviews * 150, // 조회수는 리뷰수의 150배로 대충 계산
        pricingType: target.mockPrice,
        authType: 'API_KEY',
        providerCompany: 'ETC',
        isFavorited: false,
        logo: target.localImage,
      } as unknown as ApiPreview // 타입 강제 호환
    })
  }

  const handleSearch = (query: string) => {
    navigate(`/explore?q=${encodeURIComponent(query)}`)
  }

  const toggleView = () => {
    setShowMore((prev) => !prev)
    if (showMore) window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!showMore) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-8">
          {!isSearchOpen && <IntroSection />}
          <SearchBar
            isOpen={isSearchOpen}
            setIsOpen={setIsSearchOpen}
            isMain={true}
            onSearch={handleSearch}
          />
          {!isSearchOpen && <SearchTagSection />}
        </div>
        {!isSearchOpen && <BottomButtonSection onClick={toggleView} isExpanded={false} />}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <div className="w-full flex flex-col items-center pt-24 pb-24 animate-slide-up">
        {/* 뉴스 섹션 */}
        <ScrollableSection title="Latest News" data={newsItems} type="news" />

        {/* ✅ Recent Popular: DB 매칭 + Gmail 목데이터 */}
        <ScrollableSection
          title="Recent Popular"
          data={mergeData(TARGET_POPULAR, serverData?.content)}
          type="api"
        />

        {/* ✅ Suggest API: 전량 목데이터 */}
        <ScrollableSection
          title="Suggest API"
          data={mergeData(TARGET_SUGGEST, serverData?.content)}
          type="api"
        />
      </div>

      <BottomButtonSection onClick={toggleView} isExpanded={true} />
    </div>
  )
}

export default HomePage
