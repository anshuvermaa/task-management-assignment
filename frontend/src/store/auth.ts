// 📄 frontend/src/store/auth.ts

import { create } from "zustand"

type AuthState = {
  token: string | null
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  setToken: (token: string) => {
    localStorage.setItem("token", token)
    set({ token })
  },
  logout: () => {
    localStorage.removeItem("token")
    set({ token: null })
  }
}))
