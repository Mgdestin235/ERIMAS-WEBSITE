'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Menu, LogOut } from 'lucide-react'

export function AdminTopbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { data: session } = useSession()
  const [signingOut, setSigningOut] = useState(false)

  return (
    <header className="flex h-16 items-center justify-between border-b border-navy-800 bg-navy-950/80 px-5 backdrop-blur">
      <button onClick={onOpenMenu} className="rounded-lg p-2 text-navy-300 hover:bg-navy-800 lg:hidden" aria-label="Ouvrir le menu">
        <Menu size={20} />
      </button>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-cream">{session?.user?.name}</p>
          <p className="text-xs text-navy-400">{session?.user?.role === 'ADMIN' ? 'Administrateur' : 'Éditeur'}</p>
        </div>
        <button
          onClick={() => {
            setSigningOut(true)
            signOut({ callbackUrl: '/admin/connexion' })
          }}
          disabled={signingOut}
          className="inline-flex items-center gap-2 rounded-full border border-navy-700 px-4 py-2 text-xs font-semibold text-navy-200 transition-colors hover:border-red-700 hover:text-red-300"
        >
          <LogOut size={14} />
          Déconnexion
        </button>
      </div>
    </header>
  )
}
