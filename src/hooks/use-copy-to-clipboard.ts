import { useCallback, useEffect, useRef, useState } from 'react'

import { copyText } from '@/lib/clipboard'

export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      if (!(await copyText(text))) {
        return
      }

      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), resetMs)
    },
    [resetMs],
  )

  return { copied, copy }
}
