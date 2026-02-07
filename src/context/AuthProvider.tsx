import { useState, type PropsWithChildren } from 'react'
import { AuthContext } from './AuthContext'
import type { RequestSigninDto } from '@/types/auth'
import { useTokenStorage } from '@/hooks/useTokenStorage'
import { postLogout, postSignin } from '@/apis/auth'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getToken, setToken, removeToken } = useTokenStorage()
  const [accessToken, setAccessToken] = useState<string | null>(getToken())

  const login = async (signInData: RequestSigninDto) => {
    const response = await postSignin(signInData)
    if (response?.isSuccess && response.result) {
      setToken(response.result.accessToken)
      setAccessToken(response.result.accessToken)
    }
  }

  const logout = async () => {
    await postLogout().catch(() => {})
    removeToken()
    setAccessToken(null)
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>{children}</AuthContext.Provider>
  )
}
