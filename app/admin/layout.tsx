'use client'

import { useEffect } from 'react'
import { Sidebar } from "@/components/admin/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const checkLogout = () => {
      if (localStorage.getItem('logout-trigger')) {
        localStorage.removeItem('logout-trigger')
        window.location.href = '/admin/login'
      }
    }
    
    window.addEventListener('storage', checkLogout)
    return () => window.removeEventListener('storage', checkLogout)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <main>{children}</main>
      </div>
    </div>
  )
}