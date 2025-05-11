import { createFileRoute } from '@tanstack/react-router'
import Board from '@/components/board'
import { z } from 'zod'

const BoardIdSchema = z.object({
  boardId: z.string()
})

export const Route = createFileRoute('/_protected/board/$boardId')({
  component: RouteComponent,
  validateSearch:(boardId)=> BoardIdSchema.safeParse(boardId)
})

function RouteComponent() {
   const { boardId } = Route.useParams() // Get boardId from URL
  
  return  <Board boardId={boardId}/>
}
