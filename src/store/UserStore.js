import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (userData, token) => set({ user: userData, token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    { name: 'user-storage' } // key in localStorage
  )
)

