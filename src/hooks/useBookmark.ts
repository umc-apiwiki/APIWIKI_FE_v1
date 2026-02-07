import { useCallback, useEffect } from 'react'
import { useApi } from './useApi'
import { getApiList, toggleFavorite } from '@/services/explore'
import type { PageResponse, ApiPreview, FavoriteToggle } from '@/types/api'

/**
 * 북마크 관련 로직을 처리하는 커스텀 훅
 * - 북마크된 API 목록 조회
 * - 북마크 토글 (추가/해제)
 */
export const useBookmark = () => {
  const {
    data: bookmarkedApis,
    isLoading,
    error,
    execute: executeList,
    reset,
    clearError,
  } = useApi<PageResponse<ApiPreview>>()

  const {
    isLoading: isToggling,
    error: toggleError,
    execute: executeToggle,
  } = useApi<FavoriteToggle>()

  /**
   * 북마크된 API 목록을 불러옵니다.
   * 서버에서 모든 API를 가져온 후 isFavorited가 true인 항목만 필터링합니다.
   */
  const fetchBookmarkedApis = useCallback(() => {
    return executeList(async () => {
      // 충분히 큰 size로 API 목록을 가져옵니다
      const res = await getApiList({ size: 1000, page: 0 })

      if (!res.isSuccess || !res.result) {
        throw new Error(res.message || '북마크 목록을 불러오는데 실패했습니다.')
      }

      // isFavorited가 true인 항목만 필터링
      const filteredContent = res.result.content.filter((api) => api.isFavorited)

      return {
        ...res.result,
        content: filteredContent,
        listSize: filteredContent.length,
        totalElements: filteredContent.length,
      }
    })
  }, [executeList])

  /**
   * 북마크를 토글(추가/해제)합니다.
   * 성공 시 목록을 다시 불러옵니다.
   */
  const toggleBookmark = useCallback(
    async (apiId: number) => {
      const result = await executeToggle(() =>
        toggleFavorite(apiId).then((res) => {
          if (!res.isSuccess || !res.result) {
            throw new Error(res.message || '북마크 처리에 실패했습니다.')
          }
          return res.result
        })
      )

      // 성공 후 목록 새로고침
      if (result.success && result.data) {
        await fetchBookmarkedApis()
      }

      return result
    },
    [executeToggle, fetchBookmarkedApis]
  )

  /**
   * 컴포넌트 마운트 시 북마크 목록을 자동으로 불러옵니다.
   */
  useEffect(() => {
    fetchBookmarkedApis()
  }, [fetchBookmarkedApis])

  return {
    bookmarkedApis: bookmarkedApis?.content || [],
    isLoading,
    isToggling,
    error: error || toggleError,
    fetchBookmarkedApis,
    toggleBookmark,
    reset,
    clearError,
  }
}
