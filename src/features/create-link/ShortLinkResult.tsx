import { CheckIcon, CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

type ShortLinkResultProps = {
  shortUrl: string
}

export function ShortLinkResult({ shortUrl }: ShortLinkResultProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border p-4">
      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
        className="min-w-0 break-all font-medium underline-offset-4 hover:underline"
      >
        {shortUrl}
      </a>

      <Button type="button" variant="outline" size="sm" onClick={() => copy(shortUrl)}>
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? 'Скопировано' : 'Копировать'}
      </Button>
    </div>
  )
}
