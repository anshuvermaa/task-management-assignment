// 📄 frontend/src/types/task.ts

export interface Task {
    id: string
    title: string
    status: string
    boardId: string
  }
  
  export interface TaskData {
    title: string
    status: string
    boardId?: string
  }
  