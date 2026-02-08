import { axiosInstance } from '@/apis/axios'
import type { ApiResponse, ApiPricing } from '@/types/api'

/**
 * 요금 정보 조회
 * GET /api/v1/apis/{apiId}/pricing
 */
export const getApiPricing = async (apiId: number): Promise<ApiResponse<ApiPricing>> => {
  // 해당 API의 요금 유형 및 상세 요금 정보를 조회함
  const { data } = await axiosInstance.get<ApiResponse<ApiPricing>>(`/api/v1/apis/${apiId}/pricing`)
  return data
}