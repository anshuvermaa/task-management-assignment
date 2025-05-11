// 📄 frontend/src/lib/axios.ts

import axios from "axios"
import { useAuthStore } from "../store/auth"

export const api = axios.create({
  baseURL: "http://localhost:5000/api"
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
