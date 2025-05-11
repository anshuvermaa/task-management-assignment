
import { useState } from "react"
import type { Task } from "../types/task"
import { useDeleteTask, useUpdateTask } from "../api/useTaskMutation"
import { Trash, Edit, X, Check } from "lucide-react"

interface TaskCardProps {
  task: Task
  boardId:string
}

export function TaskCard({ task ,boardId }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const deleteTask = useDeleteTask()
  const updateTask = useUpdateTask(boardId)

  const handleDelete = () => {
    deleteTask.mutate({taskId:task.id,boardId:boardId})
  }

  const handleUpdate = () => {
    if (title.trim() === "") return

    updateTask.mutate(
      {
        ...task,
        title,
      },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    )
  }

  const handleCancel = () => {
    setTitle(task.title)
    setIsEditing(false)
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-3 border border-gray-200" draggable data-task-id={task.id}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex justify-between">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Check size={16} /> Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-medium mb-2">{task.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{task.status}</p>
          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              <Trash size={16} /> Delete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Edit size={16} /> Update
            </button>
          </div>
        </>
      )}
    </div>
  )
}
