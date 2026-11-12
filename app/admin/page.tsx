import type { Metadata } from 'next'
import AdminConsole from '@/components/admin/admin-console'

export const metadata: Metadata = {
  title: 'Admin | Deltran Funker',
  description: 'Manage the Deltran Funker portfolio site.',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminConsole />
}
