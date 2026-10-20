const stats = [
  { value: '3,5 трлн', label: 'Возможных комбинаций кода' },
  { value: '7', label: 'Символов в коде' },
  { value: '2048', label: 'Максимальная длина адреса' },
  { value: '2', label: 'Параметра ограничения' },
]

export function Stats() {
  return (
    <section className="border-y border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold tracking-tight text-slate-900">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
