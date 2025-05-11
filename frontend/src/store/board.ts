// 📄 frontend/src/store/board.ts

import { create } from "zustand"
import type { Board } from "../types/board"

type BoardStore = {
  boards: Board[]
  setBoards: (boards: Board[]) => void
}

export const useBoardStore = create<BoardStore>((set) => ({
  boards: [],
  setBoards: (boards) => set({ boards })
}))
