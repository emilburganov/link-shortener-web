import { LinkIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type LogoProps = {
  size?: 'md' | 'sm'
}

export function Logo({ size = 'md' }: LogoProps) {
  const small = size === 'sm'

  return (
    <div className={cn('flex items-center', small ? 'gap-2' : 'gap-2.5')}>
      <div
        className={cn(
          'flex items-center justify-center bg-teal-600',
          small ? 'size-6 rounded-md' : 'size-8 rounded-lg',
        )}
      >
        <LinkIcon className={cn('text-white', small ? 'size-3' : 'size-4')} strokeWidth={2.5} />
      </div>

      <span
        className={cn(
          small
            ? 'text-sm font-medium text-slate-600'
            : 'text-lg font-semibold tracking-tight text-slate-900',
        )}
      >
        link-shortener
      </span>
    </div>
  )
}
