import type { ReactNode } from 'react'
import Navbar from './Navbar'
import { useMatchSocket } from '@/lib/useMatchSocket'
import { useLocation } from 'react-router-dom'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const { connectionStatus } = useMatchSocket()
  const location = useLocation()
  const isDashboardRoute = location.pathname === '/'

  return (
    <div className="min-h-screen bg-[#F5F4EF]">
      <Navbar connectionStatus={connectionStatus} />
      <main className={isDashboardRoute ? 'px-0 py-0' : 'px-4 py-6 md:px-6 md:py-8'}>
        {children}
      </main>
    </div>
  )
}