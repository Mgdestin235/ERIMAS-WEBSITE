import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-helpers'
import { AdminShell } from '@/components/admin/AdminShell'

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/admin/connexion')

  return <AdminShell role={user.role}>{children}</AdminShell>
}
