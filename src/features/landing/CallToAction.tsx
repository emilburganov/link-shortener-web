import { Button } from '@/components/ui/button'

export function CallToAction() {
  return (
    <section className="bg-teal-600 px-6 py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
          Создайте короткую ссылку
        </h2>
        <p className="mb-8 text-lg text-teal-200">
          Укажите адрес и при необходимости задайте лимит переходов и срок действия.
        </p>

        <Button
          asChild
          className="h-auto rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-teal-700 hover:bg-teal-50"
        >
          <a href="#create">Создать ссылку</a>
        </Button>
      </div>
    </section>
  )
}
