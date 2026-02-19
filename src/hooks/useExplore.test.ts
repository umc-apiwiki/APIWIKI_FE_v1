import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useApiList, useApiDetail, useFavoriteToggle } from '@/hooks/useExplore'
import * as exploreService from '@/services/explore'
import type { ApiResponse, PageResponse, ApiPreview } from '@/types/api'

// services/explore 모듈 모킹
vi.mock('@/services/explore')

describe('useExplore Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useApiList', () => {
    it('API 목록 조회 성공 시 데이터 반환', async () => {
      const mockData: PageResponse<ApiPreview> = {
        content: [
          {
            apiId: 1,
            name: 'Test API',
            providerCompany: 'GOOGLE',
            authType: 'OAUTH2',
            pricingType: 'FREE',
            summary: 'Test summary',
            isFavorited: false,
            viewCounts: 100,
            reviewCount: 10,
            avgRating: 4.5,
          },
        ],
        totalPage: 1,
        totalElements: 1,
        listSize: 1,
        currentPage: 0,
        first: true,
        last: true,
      }

      const mockResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: true,
        code: '200',
        message: '조회 성공',
        result: mockData,
      }

      vi.mocked(exploreService.getApiList).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useApiList())

      expect(result.current.isLoading).toBe(false)
      expect(result.current.data).toBeNull()

      await act(async () => {
        await result.current.fetchApiList({ page: 0, size: 16 })
      })

      await waitFor(() => {
        expect(result.current.data).not.toBeNull()
      })

      expect(result.current.data).toEqual(mockData)
      expect(result.current.error).toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('API 목록 조회 실패 시 에러 반환', async () => {
      const mockResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: false,
        code: '500',
        message: '서버 에러',
        result: null,
      }

      vi.mocked(exploreService.getApiList).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useApiList())

      await act(async () => {
        await result.current.fetchApiList()
      })

      await waitFor(() => {
        expect(result.current.error).toBe('서버 에러')
      })

      expect(result.current.data).toBeNull()
    })

    it('로딩 상태 정상 동작', async () => {
      const mockData: PageResponse<ApiPreview> = {
        content: [],
        totalPage: 0,
        totalElements: 0,
        listSize: 0,
        currentPage: 0,
        first: true,
        last: true,
      }

      const mockResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: true,
        code: '200',
        message: '조회 성공',
        result: mockData,
      }

      vi.mocked(exploreService.getApiList).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(mockResponse), 100)
          })
      )

      const { result } = renderHook(() => useApiList())

      let promise: Promise<unknown>
      await act(async () => {
        promise = result.current.fetchApiList()
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(true)
      })

      await act(async () => {
        await promise
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
    })

    it('reset 호출 시 상태 초기화', async () => {
      const mockData: PageResponse<ApiPreview> = {
        content: [],
        totalPage: 0,
        totalElements: 0,
        listSize: 0,
        currentPage: 0,
        first: true,
        last: true,
      }

      const mockResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: true,
        code: '200',
        message: '조회 성공',
        result: mockData,
      }

      vi.mocked(exploreService.getApiList).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useApiList())

      await act(async () => {
        await result.current.fetchApiList()
      })

      await waitFor(() => {
        expect(result.current.data).not.toBeNull()
      })

      act(() => {
        result.current.reset()
      })

      expect(result.current.data).toBeNull()
      expect(result.current.error).toBeNull()
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('useApiDetail', () => {
    it('API 상세 조회 성공', async () => {
      const mockDetail = {
        apiId: 1,
        name: 'Test API',
        providerCompany: 'GOOGLE',
        summary: 'Test summary',
        longDescription: 'Test long description',
        officialUrl: 'https://api.test.com',
        pricingType: 'FREE',
        avgRating: 4.5,
        viewCounts: 100,
        categories: [{ categoryId: 1, name: 'Development' }],
        logo: 'https://logo.test.com/logo.png',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        isFavorited: false,
      }

      const mockResponse = {
        isSuccess: true,
        code: '200',
        message: '조회 성공',
        result: mockDetail,
      }

      vi.mocked(exploreService.getApiDetail).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useApiDetail())

      await act(async () => {
        await result.current.fetchApiDetail(1)
      })

      await waitFor(() => {
        expect(result.current.data).toEqual(mockDetail)
      })
    })

    it('존재하지 않는 API 조회 시 에러', async () => {
      const mockResponse = {
        isSuccess: false,
        code: '404',
        message: 'API를 찾을 수 없습니다.',
        result: null,
      }

      vi.mocked(exploreService.getApiDetail).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useApiDetail())

      await act(async () => {
        await result.current.fetchApiDetail(999)
      })

      await waitFor(() => {
        expect(result.current.error).toBe('API를 찾을 수 없습니다.')
      })
    })
  })

  describe('useFavoriteToggle', () => {
    it('즐겨찾기 토글 성공', async () => {
      const mockResponse = {
        isSuccess: true,
        code: '200',
        message: '즐겨찾기 추가',
        result: {
          apiId: 1,
          isFavorited: true,
        },
      }

      vi.mocked(exploreService.toggleFavorite).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useFavoriteToggle())

      await act(async () => {
        await result.current.toggle(1)
      })

      await waitFor(() => {
        expect(result.current.data).toEqual({
          apiId: 1,
          isFavorited: true,
        })
      })
    })

    it('onSuccess 콜백 실행', async () => {
      const mockResponse = {
        isSuccess: true,
        code: '200',
        message: '즐겨찾기 추가',
        result: {
          apiId: 1,
          isFavorited: true,
        },
      }

      vi.mocked(exploreService.toggleFavorite).mockResolvedValue(mockResponse)

      const onSuccessMock = vi.fn()
      const { result } = renderHook(() => useFavoriteToggle())

      await act(async () => {
        await result.current.toggle(1, onSuccessMock)
      })

      await waitFor(() => {
        expect(onSuccessMock).toHaveBeenCalledWith({
          apiId: 1,
          isFavorited: true,
        })
      })
    })

    it('즐겨찾기 토글 실패 시 에러', async () => {
      const mockResponse = {
        isSuccess: false,
        code: '401',
        message: '로그인이 필요합니다.',
        result: null,
      }

      vi.mocked(exploreService.toggleFavorite).mockResolvedValue(mockResponse)

      const { result } = renderHook(() => useFavoriteToggle())

      await act(async () => {
        await result.current.toggle(1)
      })

      await waitFor(() => {
        expect(result.current.error).toBe('로그인이 필요합니다.')
      })
    })
  })
})
