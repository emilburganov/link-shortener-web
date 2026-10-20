import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/features/landing/Hero'
import { Stats } from '@/features/landing/Stats'

export default function HomePage() {
  return (
    <div className="min-h-svh bg-white">
      <SiteHeader />

      <main>
        <Hero />
        <Stats />
      </main>

      <SiteFooter />
    </div>
  )
}
