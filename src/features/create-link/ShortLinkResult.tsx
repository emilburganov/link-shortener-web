import { CheckIcon, CopyIcon, LinkIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

type ShortLinkResultProps = {
  shortUrl: string
}

export function ShortLinkResult({ shortUrl }: ShortLinkResultProps) {
  const { copied, copy } = useCopyToClipboard()
  const card = useRef<HTMLDivElement>(null)

  useEffect(() => {
    card.current?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' })
  }, [])

  return (
    <div
      ref={card}
      className="rounded-2xl border border-slate-200 bg-white p-4 text-left animate-in fade-in zoom-in-95 duration-300 sm:p-6 motion-reduce:animate-none"
    >
      <p className="mb-3 text-xs font-semibold tracking-wide text-slate-400 uppercase">
        Короткая ссылка
      </p>

      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <LinkIcon className="size-4 shrink-0 text-teal-500" strokeWidth={2} />

          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 flex-1 font-mono text-base font-semibold break-all text-teal-700 hover:text-teal-900 hover:underline"
          >
            {shortUrl}
          </a>
        </div>

        <Button
          type="button"
          onClick={() => copy(shortUrl)}
          className={cn(
            'h-11 shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 sm:h-auto',
            copied && 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
          )}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Скопировано' : 'Копировать'}
        </Button>
      </div>
    </div>
  )
}
