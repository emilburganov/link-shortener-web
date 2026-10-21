import type { LucideIcon } from 'lucide-react'

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group flex cursor-default items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:border-teal-200 hover:bg-teal-50 sm:block sm:p-6">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-teal-600 group-hover:text-white sm:mb-4">
        <Icon className="size-[22px]" strokeWidth={1.75} />
      </div>

      <div>
        <h3 className="mb-1 font-semibold text-slate-900 sm:mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  )
}
