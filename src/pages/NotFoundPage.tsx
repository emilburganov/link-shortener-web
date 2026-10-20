import { Link } from 'react-router'

import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col items-start justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold tracking-tight">Страница не найдена</h1>
      <Button asChild>
        <Link to="/">На главную</Link>
      </Button>
    </main>
  )
}
