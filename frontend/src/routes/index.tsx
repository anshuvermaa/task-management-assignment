import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () =>   <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
  <h1 className="text-4xl font-semibold text-gray-800 mb-4">Welcome to Task Management App</h1>
  <p className="text-lg text-gray-600 mb-6">Let's try this awesome app</p>
  
  <div className="flex space-x-4">
    <Link
      to="/login"
      className="px-6 py-3 bg-blue-500 !text-white rounded-md hover:bg-blue-600"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="px-6 py-3 bg-gray-500 !text-white rounded-md hover:bg-gray-400"
    >
      Register
    </Link>
  </div>
</div>
})