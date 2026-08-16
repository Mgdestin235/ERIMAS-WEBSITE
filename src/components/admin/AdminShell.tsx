'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminTopbar } from '@/components/admin/AdminTopbar'

export function AdminShell({ role, children }: { role: 'ADMIN' | 'EDITOR'; children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-ink text-cream">
      <AdminSidebar role={role} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar onOpenMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden p-5 sm:p-8">{children}</main>
      </div>
    </div>
  )
}
