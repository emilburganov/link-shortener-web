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
      'Задайте допустимое число переходов по ссылке. Счетчик обновляется атомарно, поэтому лимит не превышается даже при одновременных обращениях.',
  },
  {
    icon: ClockIcon,
    title: 'Срок действия',
    description:
      'По наступлении указанного времени ссылка перестает работать. Время задается в вашем часовом поясе.',
  },
  {
    icon: FileWarningIcon,
    title: 'Информативные ответы',
    description:
      'Если ссылка не найдена, возвращается код 404. Если исчерпан лимит или истек срок, возвращается код 410. Браузер получает страницу с пояснением.',
  },
  {
    icon: HashIcon,
    title: 'Короткие коды',
    description:
      'Код состоит из 7 символов и создается криптографически стойким генератором случайных чисел. Доступно более 3,5 триллиона комбинаций.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Проверка адресов',
    description:
      'Принимаются только адреса со схемой http или https длиной не более 2048 символов.',
  },
  {
    icon: CodeXmlIcon,
    title: 'Открытый API',
    description:
      'Ссылки создаются запросом POST /links. Спецификация OpenAPI находится в репозитории.',
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Возможности сервиса
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-500">
            Адрес, лимит переходов и срок действия без регистрации.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
