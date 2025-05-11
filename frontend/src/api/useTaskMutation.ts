import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../lib/axios"
import type { Task, TaskData } from "../types/task"

// Creating a task
export const useCreateTask = (boardId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["createTask"],
    mutationFn: async (data: TaskData) => {
      const res = await api.post("/tasks", {...data,boardId})
      return res.data as Task
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(["tasks",boardId], (old = []) => [...old, newTask])
    },
  })
}

// Deleting a task
export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async ({ taskId, boardId }: { taskId: string; boardId: string }) => {
      await api.delete(`/tasks/${taskId}`)
      return { taskId, boardId }
    },
    onSuccess: ({ taskId, boardId }) => {
      queryClient.setQueryData<Task[]>(["tasks", boardId], (old = []) => old.filter((task) => task.id !== taskId))
    },
  })
}

// Updating a task
export const useUpdateTask = ( boardId: string ) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask"],
    mutationFn: async (task: Task) => {
      const res = await api.put(`/tasks/${task.id}`, task)
      return res.data as Task
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<Task[]>(["tasks",boardId], (old = []) =>
        old.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      )
    },
  })
}


