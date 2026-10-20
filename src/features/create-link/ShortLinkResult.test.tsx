import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ShortLinkResult } from '@/features/create-link/ShortLinkResult'

describe('ShortLinkResult', () => {
  it('copies the short url to the clipboard', async () => {
    const user = userEvent.setup()
    render(<ShortLinkResult shortUrl="http://localhost:8080/abc1234" />)

    await user.click(screen.getByRole('button', { name: 'Копировать' }))

    expect(await screen.findByRole('button', { name: 'Скопировано' })).toBeInTheDocument()
    expect(await navigator.clipboard.readText()).toBe('http://localhost:8080/abc1234')
  })
})
