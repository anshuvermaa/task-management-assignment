import { useAuthStore } from '@/store/auth';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: RouteComponent,
  beforeLoad: async () => {
    const {token} = useAuthStore.getState();
    if (!token) {
      throw redirect({
        to: '/login',
      });
    }
  },
})

function RouteComponent() {
  return <Outlet/>
}
