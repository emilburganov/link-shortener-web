import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { CreateLinkForm } from '@/features/create-link/CreateLinkForm'

export default function HomePage() {
  return (
    <div className="min-h-svh bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-xl px-6 py-24">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Сокращайте ссылки</h1>

        <CreateLinkForm />
      </main>

      <SiteFooter />
    </div>
  )
}
