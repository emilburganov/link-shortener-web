import { CreateLinkForm } from '@/features/create-link/CreateLinkForm'

export function Hero() {
  return (
    <section id="create" className="relative overflow-hidden px-6 pt-10 pb-16 md:pt-20 md:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(13,148,136,0.07)_1.5px,transparent_1.5px)] bg-size-[28px_28px] opacity-40" />
      <div className="absolute inset-x-0 top-0 h-80 bg-linear-to-b from-teal-50/60 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center animate-in fade-in slide-in-from-bottom-1.5 duration-300 motion-reduce:animate-none">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 md:mb-6">
          <span className="size-1.5 animate-pulse rounded-full bg-teal-500 motion-reduce:animate-none" />
          Бета-версия сервиса
        </div>

        <h1 className="mb-4 text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 md:mb-6 md:text-6xl">
          Короткие ссылки
          <br />
          <span className="text-teal-600">под вашим контролем.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-slate-500 md:mb-10 md:text-lg">
          Сервис создает короткий адрес с заданным числом переходов и сроком действия. Лимит
          переходов соблюдается строго, в том числе при одновременных обращениях.
        </p>

        <div className="mx-auto mb-4 max-w-2xl">
          <CreateLinkForm />
        </div>

        <p className="text-xs text-slate-400">
          Регистрация не требуется · Длина адреса до 2048 символов · Схемы http и https
        </p>
      </div>
    </section>
  )
}
