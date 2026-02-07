import { useState, useEffect, useCallback, useRef } from 'react'
import APICard from '@/components/APICard'
import SearchBar from '@/components/HomePage/SearchBar'
import FilterModal from '@/components/modal/FilterModal'
import type { FilterValues } from '@/components/modal/FilterModal'
import { useApiList, useFavoriteToggle } from '@/hooks'
import type { ApiListParams, SortOption, ApiPreview } from '@/types/api'
import Filter from '@/assets/icons/action/ic_filter.svg'
import ArrowDown from '@/assets/icons/action/ic_arrow_down.svg'

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: '최신순', value: 'LATEST' },
  { label: '인기순', value: 'POPULAR' },
  { label: '리뷰순', value: 'MOST_REVIEWED' },
]

const ExplorePage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  // API 조회 파라미터
  const [params, setParams] = useState<ApiListParams>({
    page: 0,
    size: 16,
    sort: 'LATEST',
    direction: 'DESC',
  })

  // 필터 상태 (FilterModal 초기값 전달용)
  const [filterState, setFilterState] = useState<Partial<FilterValues>>({})

  // API 목록 + 즐겨찾기
  const { data: pageData, isLoading, error, fetchApiList } = useApiList()
  const { toggle } = useFavoriteToggle()

  // 카드 목록 낙관적 업데이트용 로컬 상태
  const [items, setItems] = useState<ApiPreview[]>([])

  useEffect(() => {
    if (pageData?.content) {
      setItems(pageData.content)
    }
  }, [pageData])

  // params 변경 시 재조회
  useEffect(() => {
    fetchApiList(params)
  }, [params, fetchApiList])

  // Sort 드롭다운 외부 클릭 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // 검색
  const handleSearch = useCallback((q: string) => {
    setParams((prev) => ({ ...prev, q, page: 0 }))
  }, [])

  // 필터 적용
  const handleFilterApply = useCallback((filters: FilterValues) => {
    setFilterState(filters)
    setParams((prev) => ({
      ...prev,
      page: 0,
      pricingTypes: filters.pricingTypes.length === 1 ? filters.pricingTypes[0] : undefined,
      authTypes: filters.authTypes.length === 1 ? filters.authTypes[0] : undefined,
      minRating: filters.minRating ?? undefined,
    }))
  }, [])

  // 정렬 변경
  const handleSortChange = useCallback((sort: SortOption) => {
    setParams((prev) => ({ ...prev, sort, page: 0 }))
    setIsSortOpen(false)
  }, [])

  // 즐겨찾기 토글 (낙관적 업데이트)
  const handleToggleFavorite = useCallback(
    (apiId: number) => {
      setItems((prev) =>
        prev.map((item) =>
          item.apiId === apiId ? { ...item, isFavorited: !item.isFavorited } : item
        )
      )
      toggle(apiId, () => {
        // 성공 시 아무것도 안 함 (이미 낙관적으로 업데이트)
      })
    },
    [toggle]
  )

  // 페이지 이동
  const handlePageChange = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const currentSort = SORT_OPTIONS.find((o) => o.value === params.sort) ?? SORT_OPTIONS[0]

  return (
    <div className="mt-10">
      <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} onSearch={handleSearch} />

      <div className="mt-8">
        {/* 카드 개수 및 필터/정렬 */}
        <div className="flex whitespace-nowrap justify-between sm:pl-8 md:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32">
          <span className="font-sans text-sm text-[#B0B0B0]">
            {pageData ? `${pageData.totalElements.toLocaleString()}개` : '-'}
          </span>
          <div className="flex gap-6 sm:pr-8 md:pr-16 lg:pr-20 xl:pr-28 2xl:pr-32 font-sans text-lg font-medium text-info-dark">
            {/* 필터 */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex hover:text-brand-500"
            >
              <span>Filters</span>
              <img src={Filter} alt="필터" />
            </button>
            {isFilterOpen && (
              <FilterModal
                onClose={() => setIsFilterOpen(false)}
                onApply={handleFilterApply}
                initialFilters={filterState}
              />
            )}

            {/* 정렬 */}
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => setIsSortOpen((prev) => !prev)}
                className="flex items-center hover:text-brand-500"
              >
                <span>{currentSort.label}</span>
                <img src={ArrowDown} alt="정렬" className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-brand-500/20 z-20 min-w-[120px]">
                  {SORT_OPTIONS.map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleSortChange(value)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-brand-500/10 transition-colors ${
                        params.sort === value ? 'text-brand-500 font-semibold' : 'text-info-dark'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 로딩 */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* 에러 */}
        {error && !isLoading && (
          <div className="text-center py-20 text-red-500 font-sans">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => fetchApiList(params)}
              className="mt-4 px-6 py-2 bg-brand-500 text-white rounded-full text-sm"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 결과 없음 */}
        {!isLoading && !error && items.length === 0 && (
          <div className="text-center py-20 text-[#B0B0B0] font-sans">
            <p className="text-lg">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* 카드 그리드 */}
        {!isLoading && !error && items.length > 0 && (
          <div
            className="mt-3 gap-10 grid grid-cols-1
              sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
              sm:pl-8 md:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32
              sm:pr-8 md:pr-16 lg:pr-20 xl:pr-28 2xl:pr-32"
          >
            {items.map((api) => (
              <APICard key={api.apiId} {...api} onToggleFavorite={handleToggleFavorite} />
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        {pageData && pageData.totalPage > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 pb-10">
            <button
              type="button"
              disabled={pageData.first}
              onClick={() => handlePageChange((pageData.currentPage) - 1)}
              className="px-3 py-1 rounded-lg text-sm font-medium disabled:text-[#B0B0B0] disabled:cursor-not-allowed text-info-dark hover:bg-brand-500/10"
            >
              이전
            </button>
            {Array.from({ length: pageData.totalPage }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePageChange(i)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  pageData.currentPage === i
                    ? 'bg-brand-500 text-white'
                    : 'text-info-dark hover:bg-brand-500/10'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={pageData.last}
              onClick={() => handlePageChange((pageData.currentPage) + 1)}
              className="px-3 py-1 rounded-lg text-sm font-medium disabled:text-[#B0B0B0] disabled:cursor-not-allowed text-info-dark hover:bg-brand-500/10"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExplorePage
