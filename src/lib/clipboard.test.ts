import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { copyText } from '@/lib/clipboard'

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, 'clipboard', { value, configurable: true })
}

describe('copyText', () => {
  const execCommand = vi.fn()

  beforeEach(() => {
    document.execCommand = execCommand
    execCommand.mockReturnValue(true)
  })

  afterEach(() => {
    execCommand.mockReset()
    setClipboard(undefined)
  })

  it('uses the clipboard api when it is available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    setClipboard({ writeText })

    const ok = await copyText('http://short.test/abc')

    expect(ok).toBe(true)
    expect(writeText).toHaveBeenCalledWith('http://short.test/abc')
    expect(execCommand).not.toHaveBeenCalled()
  })

  it.each([
    {
      name: 'the clipboard api is unavailable, for example on a page without https',
      clipboard: undefined,
    },
    {
      name: 'the clipboard api rejects the write',
      clipboard: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    },
  ])('falls back to selecting and copying when $name', async ({ clipboard }) => {
    setClipboard(clipboard)

    const ok = await copyText('http://short.test/abc')

    expect(ok).toBe(true)
    expect(execCommand).toHaveBeenCalledWith('copy')
    expect(document.querySelector('textarea')).toBeNull()
  })

  it('reports a failure when nothing can copy', async () => {
    setClipboard(undefined)
    execCommand.mockReturnValue(false)

    const ok = await copyText('http://short.test/abc')

    expect(ok).toBe(false)
  })
})
