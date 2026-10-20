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
      'Задайте, сколько раз ссылка может сработать. Счетчик обновляется атомарно, поэтому лимит не превышается, даже когда переходов много одновременно.',
  },
  {
    icon: ClockIcon,
    title: 'Срок жизни',
    description:
      'Ссылка сама перестает работать в выбранный момент. Время вы указываете в своем часовом поясе.',
  },
  {
    icon: FileWarningIcon,
    title: 'Понятные ответы',
    description:
      'Если ссылки нет, отвечаем 404, если лимит исчерпан или срок вышел, отвечаем 410. Браузер получает страницу с пояснением.',
  },
  {
    icon: HashIcon,
    title: 'Короткие коды',
    description:
      'Код из 7 символов генерируется криптографически случайно: больше 3,5 триллиона вариантов.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Только http и https',
    description:
      'Принимаются адреса со схемой http или https длиной до 2048 символов, остальное отклоняется.',
  },
  {
    icon: CodeXmlIcon,
    title: 'Открытый API',
    description:
      'Создавайте ссылки запросом POST /links. Описание в формате OpenAPI лежит в репозитории.',
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Все, что нужно короткой ссылке
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-500">
            Без аккаунтов и лишних настроек: адрес, лимит и срок.
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
