import { Logo } from '@/components/Logo'

const links = [
  { label: 'Код сервера', href: 'https://github.com/emilburganov/link-shortener' },
  { label: 'Код клиента', href: 'https://github.com/emilburganov/link-shortener-web' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <Logo size="sm" />

        <p className="text-sm text-slate-400">© 2026 link-shortener</p>

        <div className="flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-400 transition-colors hover:text-slate-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
