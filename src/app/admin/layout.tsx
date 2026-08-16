import type { Metadata } from 'next'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { RegisterServiceWorker } from '@/components/admin/RegisterServiceWorker'

export const metadata: Metadata = {
  title: { default: 'Portail admin', template: '%s — Admin ERIMAS' },
  description: 'Back-office ERIMAS — réservé aux administrateurs et éditeurs.',
  robots: { index: false, follow: false },
  manifest: '/manifest-admin.webmanifest',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'ERIMAS Admin' },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <RegisterServiceWorker />
      {children}
    </AuthProvider>
  )
}
