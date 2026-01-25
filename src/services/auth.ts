import api from './api'
import type { ApiResponse, LoginRequest, LoginResponse, SignupRequest } from '@/types/api'

/**
 * 회원가입
 */
export const signup = async (data: SignupRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await api.post('/api/v1/auth/signup', data)
  return response.data
}

/**
 * 로그인
 */
export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  const response = await api.post('/api/v1/auth/login', data)
  const result = response.data

  // 로그인 성공 시 토큰과 유저 정보 저장
  if (result.isSuccess && result.result) {
    localStorage.setItem('accessToken', result.result.accessToken)
    localStorage.setItem('memberId', String(result.result.memberId))
    localStorage.setItem('nickname', result.result.nickname)
  }

  return result
}

/**
 * 로그아웃
 */
export const logout = async (): Promise<ApiResponse<string>> => {
  const response = await api.post('/api/v1/auth/logout')
  const result = response.data

  // 로그아웃 성공 시 로컬 스토리지 정리
  if (result.isSuccess) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('memberId')
    localStorage.removeItem('nickname')
  }

  return result
}

/**
 * 저장된 토큰 반환
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

/**
 * 사용자 정보 반환
 */
export const getCurrentUser = () => {
  const memberId = localStorage.getItem('memberId')
  const nickname = localStorage.getItem('nickname')
  const accessToken = getAccessToken()

  return {
    memberId: memberId ? Number(memberId) : null,
    nickname,
    isAuthenticated: !!accessToken,
  }
}
