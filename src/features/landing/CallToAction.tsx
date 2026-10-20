import { Button } from '@/components/ui/button'

export function CallToAction() {
  return (
    <section className="bg-blue-600 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
          Готовы сократить первую ссылку?
        </h2>
        <p className="mb-8 text-lg text-blue-200">Бесплатно и без регистрации.</p>

        <Button
          asChild
          className="h-auto rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-blue-700 shadow-sm hover:bg-blue-50"
        >
          <a href="#create">Создать ссылку</a>
        </Button>
      </div>
    </section>
  )
}
