import { CreateLinkForm } from '@/features/create-link/CreateLinkForm'

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col justify-center gap-8 p-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">link-shortener</h1>
        <p className="text-muted-foreground">Короткие ссылки с лимитом переходов и сроком жизни.</p>
      </header>

      <CreateLinkForm />
    </main>
  )
}
