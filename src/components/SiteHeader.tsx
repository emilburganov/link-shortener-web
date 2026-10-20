import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            Возможности
          </a>
          <a
            href="https://github.com/emilburganov/link-shortener"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            Исходный код
          </a>
        </nav>

        <Button asChild className="h-9 rounded-lg px-4 text-sm font-medium">
          <a href="#create">Создать ссылку</a>
        </Button>
      </div>
    </header>
  )
}
