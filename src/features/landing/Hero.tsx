import { CreateLinkForm } from '@/features/create-link/CreateLinkForm'

export function Hero() {
  return (
    <section id="create" className="relative overflow-hidden px-6 pt-20 pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(37,99,235,0.07)_1.5px,transparent_1.5px)] bg-size-[28px_28px] opacity-40" />
      <div className="absolute inset-x-0 top-0 h-80 bg-linear-to-b from-blue-50/60 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center animate-in fade-in slide-in-from-bottom-1.5 duration-300 motion-reduce:animate-none">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
          <span className="size-1.5 animate-pulse rounded-full bg-blue-500 motion-reduce:animate-none" />
          Открытый код под лицензией MIT
        </div>

        <h1 className="mb-6 text-5xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-6xl">
          Сокращайте ссылки
          <br />
          <span className="text-blue-600">мгновенно.</span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-500">
          Короткий адрес с лимитом переходов и сроком жизни. Лимит соблюдается точно, даже когда по
          ссылке переходят одновременно.
        </p>

        <div className="mx-auto mb-4 max-w-2xl">
          <CreateLinkForm />
        </div>

        <p className="text-xs text-slate-400">
          Без регистрации · Адрес до 2048 символов · Только http и https
        </p>
      </div>
    </section>
  )
}
