import type React from "react"

import { useEffect, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { TaskCard } from "./task-card"
import { TaskForm } from "./task-form"
import type { Task } from "../types/task"
import { api } from "../lib/axios"
import { useUpdateTask } from "../api/useTaskMutation"
import { Link } from "@tanstack/react-router"

export default function Board({boardId}:{boardId:string}) {
  const queryClient = useQueryClient()
  const updateTask = useUpdateTask(boardId) 
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  // Fetch tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery<Task[]>({
    queryKey: ["tasks",boardId],
    queryFn: async () => {
      const res = await api.get(`/tasks/board/${boardId}`)
      return res.data
    },
  })

  // Filter tasks by status
  const todoTasks = tasks.filter((task) => task.status === "Todo")
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress")
  const completedTasks = tasks.filter((task) => task.status === "Completed")

  // Drag and drop handlers
  useEffect(() => {
    const handleDragStart = (e: DragEvent) => {
      if (!(e.target instanceof HTMLElement)) return

      const taskElement = e.target.closest("[data-task-id]")
      if (!taskElement) return

      const taskId = taskElement.getAttribute("data-task-id")
      if (!taskId) return

      const task = tasks.find((t) => t.id === taskId)
      if (task) {
        setDraggedTask(task)
      }
    }

    document.addEventListener("dragstart", handleDragStart)
    return () => {
      document.removeEventListener("dragstart", handleDragStart)
    }
  }, [tasks])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (status: string) => {
    if (!draggedTask || draggedTask.status === status) return

    // Update task status
    updateTask.mutate(
      { ...draggedTask, status },
      {
        onSuccess: (updatedTask) => {
          // Optimistically update the UI
          queryClient.setQueryData<Task[]>(["tasks"], (oldTasks) => {
            if (!oldTasks) return []
            return oldTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
          })

          // Reset dragged task
          setDraggedTask(null)
        },
      },
    )
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading tasks...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading tasks</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <Link to={"/dashboard"}>
      <h1 className="text-2xl font-bold mb-6">Task Board</h1>
        </Link>

      <TaskForm boardId={boardId} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Todo Column */}
        <div className="bg-gray-100 p-4 rounded-lg" onDragOver={handleDragOver} onDrop={() => handleDrop("Todo")}>
          <h2 className="font-bold text-lg mb-4">Todo</h2>
          <div className="min-h-[200px]">
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} boardId={boardId} />
            ))}
            {todoTasks.length === 0 && <div className="text-center text-gray-500 py-4">No tasks</div>}
          </div>
        </div>

        {/* In Progress Column */}
        <div
          className="bg-gray-100 p-4 rounded-lg"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop("In Progress")}
        >
          <h2 className="font-bold text-lg mb-4">In Progress</h2>
          <div className="min-h-[200px]">
            {inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task}  boardId={boardId}/>
            ))}
            {inProgressTasks.length === 0 && <div className="text-center text-gray-500 py-4">No tasks</div>}
          </div>
        </div>

        {/* Completed Column */}
        <div className="bg-gray-100 p-4 rounded-lg" onDragOver={handleDragOver} onDrop={() => handleDrop("Completed")}>
          <h2 className="font-bold text-lg mb-4">Completed</h2>
          <div className="min-h-[200px]">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} boardId={boardId} />
            ))}
            {completedTasks.length === 0 && <div className="text-center text-gray-500 py-4">No tasks</div>}
          </div>
        </div>
      </div>
    </div>
  )
}