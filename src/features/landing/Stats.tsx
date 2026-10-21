const stats = [
  { value: '3,5 трлн', label: 'Возможных комбинаций кода' },
  { value: '7', label: 'Символов в коде' },
  { value: '2048', label: 'Максимальная длина адреса' },
  { value: '2', label: 'Параметра ограничения' },
]

export function Stats() {
  return (
    <section className="border-y border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-slate-500 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
