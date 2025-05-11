import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { api } from "../../lib/axios"
import { useAuthStore } from "../../store/auth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Board,CreateBoardData } from "../../types/board"

export const Route = createFileRoute('/_protected/dashboard')({
  component: RouteComponent,
})

const boardSchema = z.object({
  title: z.string().min(1, "Title is required")
})

type BoardData = z.infer<typeof boardSchema>

function RouteComponent() {
  const navigate = useNavigate()
  const { token } = useAuthStore((state) => state) // Access token from Zustand

  // Fetch boards data with TanStack Query
  const { data: boardsData = [], isLoading } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: async () => {
      const res = await api.get("/boards")
      return res.data
    },
    enabled: !!token, // Only fetch boards if the token is available
  })

  const [loading, setLoading] = useState(false)

  // React Hook Form to handle board creation form
  const { register, handleSubmit, formState: { errors } } = useForm<BoardData>({
    resolver: zodResolver(boardSchema)
  })

  const createBoardMutation = useMutation<Board, Error, CreateBoardData>({
    mutationKey: ["createBoard"],
    mutationFn: async (data) => {
      const response = await api.post("/boards", data)
      return response.data
    },
    onSuccess: (newBoard) => {
      // Ensure tasks is always an empty array
      newBoard.tasks = newBoard.tasks || []  
      boardsData.push(newBoard) 
    }
  })

  const onSubmit = (data: BoardData) => {
    setLoading(true)
    createBoardMutation.mutate(data, {
      onSuccess: () => setLoading(false),
      onError: () => setLoading(false)
    })
  }

  const handleBoardClick = (boardId: string) => {
    console.log("board id",boardId)
    navigate({
      to: `/board/${boardId}`
    })
  }
  

  return    <div className="min-h-screen bg-gray-100 flex flex-col">
  <div className="flex justify-between items-center p-6 bg-white shadow-md">
    <h1 className="text-2xl font-semibold">Task Manager Dashboard</h1>
    <button
      onClick={() => navigate({
        to:"/login"
      })}
      className="bg-red-500 text-white py-2 px-4 rounded"
    >
      Logout
    </button>
  </div>

  <div className="p-6 space-y-6">
    {/* Create Board Form */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold">Create a New Board</h2>
      <input
        type="text"
        placeholder="Enter board title"
        {...register("title")}
        className="w-full border px-4 py-2 rounded"
      />
      {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Board"}
      </button>
    </form>

    {/* Displaying the list of boards */}
    {isLoading ? (
      <p>Loading boards...</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boardsData?.map((board) => (
          <div
            key={board.id}
            className="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
            onClick={() => handleBoardClick(board.id)}
          >
            <h3 className="font-semibold">{board.title}</h3>
            <p>{board.tasks ? board.tasks.length : 0} Tasks</p> {/* Ensure tasks exists */}
          </div>
        ))}
      </div>
    )}
  </div>
</div>
}
