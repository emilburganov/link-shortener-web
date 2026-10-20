import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/features/landing/Hero'

export default function HomePage() {
  return (
    <div className="min-h-svh bg-white">
      <SiteHeader />

      <main>
        <Hero />
      </main>

      <SiteFooter />
    </div>
  )
}
