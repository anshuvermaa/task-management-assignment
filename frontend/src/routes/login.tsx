import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useLogin } from "../api/useAuthMutation"
import { useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})


const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

type FormData = z.infer<typeof schema>

function RouteComponent() {

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const login = useLogin()

  const onSubmit = (data: FormData) => {
    login.mutate(data, {
      onSuccess: () => navigate({ to: "/dashboard" })
    })
  }
  return <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          {...register("email")}
          placeholder="Email"
          className="w-full border px-3 py-2"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2"
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={login.isPending}
        >
          {login.isPending ? "Logging in..." : "Login"}
        </button>

        <p className="text-lg text-gray-600 mb-6">Don't have a account click here to <Link to={"/register"}> Register</Link></p>

        {login.isError && (
          <p className="text-red-500 text-sm">{(login.error as any)?.response?.data?.message}</p>
        )}
      </form>
    </div>
}
