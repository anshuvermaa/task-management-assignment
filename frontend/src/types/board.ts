// 📄 frontend/src/types/board.ts

import type { Task } from "./task"

export interface Board {
    id: string
    title: string
    tasks: Task[]
  }
  
  export interface CreateBoardData {
    title: string
  }
  