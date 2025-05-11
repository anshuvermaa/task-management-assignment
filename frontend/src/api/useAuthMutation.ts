// 📄 frontend/src/api/useAuthMutation.ts

import { useMutation } from "@tanstack/react-query"
import { api } from "../lib/axios"
import { useAuthStore } from "../store/auth"

export const useLogin = () => {
  const setToken = useAuthStore((s) => s.setToken)
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("/auth/login", data)
      return res.data.token
    },
    onSuccess: (token) => setToken(token)
  })
}

export const useRegister = () => {
  const setToken = useAuthStore((s) => s.setToken)
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await api.post("/auth/register", data)
      return res.data.token
    },
    onSuccess: (token) => setToken(token)
  })
}
