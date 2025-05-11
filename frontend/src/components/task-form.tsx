
import type React from "react"

import { useState } from "react"
import { useCreateTask } from "../api/useTaskMutation"

export function TaskForm({boardId}:{boardId:string}) {
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState<string>("Todo")
  const createTask = useCreateTask(boardId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim() === "") return
console.log("aadeding")
    createTask.mutate(
      { title, status },
      {
        onSuccess: () => {
          setTitle("")

        },
      },
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Create a New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as string)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          disabled={createTask.isPending}
        >
          {createTask.isPending ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  )
}
