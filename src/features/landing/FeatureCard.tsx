import type { LucideIcon } from 'lucide-react'

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group cursor-default rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50">
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
        <Icon className="size-[22px]" strokeWidth={1.75} />
      </div>

      <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
    </div>
  )
}
