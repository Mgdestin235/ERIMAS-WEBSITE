'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, AlertTriangle } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await signIn('credentials', { email, password, redirect: false })

    if (res?.error) {
      setError('E-mail ou mot de passe incorrect.')
      setLoading(false)
      return
    }
    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo tone="white" />
        </div>
        <h1 className="mt-8 text-center font-display text-2xl font-semibold text-cream">Portail admin</h1>
        <p className="mt-2 text-center text-sm text-navy-400">Connectez-vous pour gérer le contenu du site.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-200">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-navy-700 bg-navy-900/60 px-4 py-3 text-sm text-cream focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-200">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-navy-700 bg-navy-900/60 px-4 py-3 text-sm text-cream focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400/30"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-mint-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
