import {
  ClockIcon,
  CodeXmlIcon,
  FileWarningIcon,
  HashIcon,
  MousePointerClickIcon,
  ShieldCheckIcon,
} from 'lucide-react'

import { FeatureCard } from '@/features/landing/FeatureCard'

const features = [
  {
    icon: MousePointerClickIcon,
    title: 'Лимит переходов',
    description:
      'Ограничьте число переходов. Лимит не превышается даже при одновременных обращениях.',
  },
  {
    icon: ClockIcon,
    title: 'Срок действия',
    description: 'После указанного времени ссылка перестает работать.',
  },
  {
    icon: FileWarningIcon,
    title: 'Информативные ответы',
    description: 'Для недоступной ссылки открывается страница с пояснением причины.',
  },
  {
    icon: HashIcon,
    title: 'Короткие коды',
    description: 'Случайный код из 7 символов, более 3,5 триллиона комбинаций.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Проверка адресов',
    description: 'Только http и https, длина адреса до 2048 символов.',
  },
  {
    icon: CodeXmlIcon,
    title: 'Открытый API',
    description: 'Создание ссылок запросом POST /links, спецификация OpenAPI.',
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-16 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Возможности сервиса
          </h2>
          <p className="mx-auto max-w-xl text-base text-slate-500 sm:text-lg">
            Адрес, лимит переходов и срок действия без регистрации.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
