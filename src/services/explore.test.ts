import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as exploreService from '@/services/explore'
import api from '@/services/api'
import type { ApiResponse, PageResponse, ApiPreview } from '@/types/api'

// api 모듈 모킹
vi.mock('@/services/api')

describe('Explore Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getApiList', () => {
    it('API 목록 조회 성공 시 페이지 응답 반환', async () => {
      const mockApiList: ApiPreview[] = [
        {
          apiId: 1,
          apiName: 'Test API 1',
          providerCompany: 'TEST_COMPANY',
          isOAuth: true,
          isPaid: false,
          category: 'Development',
          description: 'Test API 1 description',
          isFavorited: false,
          createdAt: '2024-01-01',
          viewCount: 100,
          reviewCount: 10,
          averageRating: 4.5,
        },
        {
          apiId: 2,
          apiName: 'Test API 2',
          providerCompany: 'TEST_COMPANY',
          isOAuth: false,
          isPaid: true,
          category: 'AI/ML',
          description: 'Test API 2 description',
          isFavorited: true,
          createdAt: '2024-01-02',
          viewCount: 200,
          reviewCount: 20,
          averageRating: 4.8,
        },
      ]

      const mockResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: true,
        code: '200',
        message: '조회 성공',
        result: {
          content: mockApiList,
          totalPage: 10,
          totalElements: 100,
          listSize: 2,
          currentPage: 0,
          first: true,
          last: false,
        },
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await exploreService.getApiList({ page: 0, size: 16 })

      expect(result.isSuccess).toBe(true)
      expect(result.result?.content).toHaveLength(2)
      expect(result.result?.currentPage).toBe(0)
      expect(result.result?.totalElements).toBe(100)
      expect(result.result?.last).toBe(false)
      expect(api.get).toHaveBeenCalledWith('/api/v1/apis', {
        params: { page: 0, size: 16 },
      })
    })

    it('필터링된 API 목록 조회 시 파라미터 전달', async () => {
      const mockResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: true,
        code: '200',
        message: '조회 성공',
        result: {
          content: [],
          totalPage: 1,
          totalElements: 0,
          listSize: 0,
          currentPage: 0,
          first: true,
          last: true,
        },
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      await exploreService.getApiList({
        page: 0,
        size: 16,
        q: 'search keyword',
        sort: 'POPULAR',
        categoryId: 1,
        minRating: 4.0,
      })

      expect(api.get).toHaveBeenCalledWith('/api/v1/apis', {
        params: {
          page: 0,
          size: 16,
          q: 'search keyword',
          sort: 'POPULAR',
          categoryId: 1,
          minRating: 4.0,
        },
      })
    })

    it('마지막 페이지 조회 시 last가 true로 반환', async () => {
      const mockResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: true,
        code: '200',
        message: '조회 성공',
        result: {
          content: [],
          totalPage: 5,
          totalElements: 80,
          listSize: 0,
          currentPage: 4,
          first: false,
          last: true,
        },
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      const result = await exploreService.getApiList({ page: 4, size: 16 })

      expect(result.result?.last).toBe(true)
      expect(result.result?.currentPage).toBe(4)
    })

    it('API 호출 실패 시 에러 응답 반환', async () => {
      const mockErrorResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: false,
        code: '500',
        message: '서버 에러',
        result: null,
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockErrorResponse })

      const result = await exploreService.getApiList()

      expect(result.isSuccess).toBe(false)
      expect(result.message).toBe('서버 에러')
    })

    it('네트워크 에러 시 예외 발생', async () => {
      vi.mocked(api.get).mockRejectedValue(new Error('Network Error'))

      await expect(exploreService.getApiList()).rejects.toThrow('Network Error')
    })

    it('파라미터 없이 호출 시 기본값으로 요청', async () => {
      const mockResponse: ApiResponse<PageResponse<ApiPreview>> = {
        isSuccess: true,
        code: '200',
        message: '조회 성공',
        result: {
          content: [],
          totalPage: 1,
          totalElements: 16,
          listSize: 16,
          currentPage: 0,
          first: true,
          last: true,
        },
      }

      vi.mocked(api.get).mockResolvedValue({ data: mockResponse })

      await exploreService.getApiList()

      expect(api.get).toHaveBeenCalledWith('/api/v1/apis', {
        params: undefined,
      })
    })
  })

  describe('getApiDetail', () => {
    it('API 상세 조회 성공', async () => {
      const mockResponse = {
        data: {
          isSuccess: true,
          code: '200',
          message: '조회 성공',
          result: {
            apiId: 1,
            apiName: 'Test API',
            providerCompany: 'TEST_COMPANY',
            description: 'Test description',
            category: 'Development',
            isOAuth: true,
            isPaid: false,
            isFavorited: false,
            createdAt: '2024-01-01',
            viewCount: 100,
            reviewCount: 10,
            averageRating: 4.5,
            apiUrl: 'https://api.test.com',
            documentationUrl: 'https://docs.test.com',
          },
        },
      }

      vi.mocked(api.get).mockResolvedValue(mockResponse)

      const result = await exploreService.getApiDetail(1)

      expect(result.isSuccess).toBe(true)
      expect(result.result?.apiId).toBe(1)
      expect(api.get).toHaveBeenCalledWith('/api/v1/apis/1')
    })

    it('존재하지 않는 API 조회 시 실패 응답', async () => {
      const mockResponse = {
        data: {
          isSuccess: false,
          code: '404',
          message: 'API를 찾을 수 없습니다.',
          result: null,
        },
      }

      vi.mocked(api.get).mockResolvedValue(mockResponse)

      const result = await exploreService.getApiDetail(999)

      expect(result.isSuccess).toBe(false)
      expect(result.message).toBe('API를 찾을 수 없습니다.')
    })
  })

  describe('toggleFavorite', () => {
    it('즐겨찾기 추가 성공', async () => {
      const mockResponse = {
        data: {
          isSuccess: true,
          code: '200',
          message: '즐겨찾기 추가',
          result: {
            apiId: 1,
            isFavorited: true,
          },
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await exploreService.toggleFavorite(1)

      expect(result.isSuccess).toBe(true)
      expect(result.result?.isFavorited).toBe(true)
      expect(api.post).toHaveBeenCalledWith('/api/v1/apis/1/favorite')
    })

    it('즐겨찾기 제거 성공', async () => {
      const mockResponse = {
        data: {
          isSuccess: true,
          code: '200',
          message: '즐겨찾기 제거',
          result: {
            apiId: 1,
            isFavorited: false,
          },
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await exploreService.toggleFavorite(1)

      expect(result.isSuccess).toBe(true)
      expect(result.result?.isFavorited).toBe(false)
    })

    it('인증되지 않은 사용자 요청 시 실패', async () => {
      const mockResponse = {
        data: {
          isSuccess: false,
          code: '401',
          message: '로그인이 필요합니다.',
          result: null,
        },
      }

      vi.mocked(api.post).mockResolvedValue(mockResponse)

      const result = await exploreService.toggleFavorite(1)

      expect(result.isSuccess).toBe(false)
      expect(result.message).toBe('로그인이 필요합니다.')
    })
  })
})
