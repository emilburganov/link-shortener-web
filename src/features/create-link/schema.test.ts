import { describe, expect, it } from 'vitest'

import { createLinkSchema, toCreateLinkRequest } from '@/features/create-link/schema'

function parse(values: Partial<{ url: string; maxClicks: string; expiresAt: string }>) {
  return createLinkSchema.safeParse({
    url: 'https://example.com',
    maxClicks: '',
    expiresAt: '',
    ...values,
  })
}

function firstMessage(result: ReturnType<typeof parse>) {
  return result.success ? undefined : result.error.issues[0]?.message
}

describe('createLinkSchema', () => {
  it.each([
    {
      name: 'url only',
      values: {},
    },
    {
      name: 'http url',
      values: { url: 'http://example.com/path?q=1' },
    },
    {
      name: 'limit and future expiry',
      values: { maxClicks: '5', expiresAt: '2999-01-02T03:04' },
    },
  ])('accepts $name', ({ values }) => {
    expect(parse(values).success).toBe(true)
  })

  it.each([
    {
      name: 'empty url',
      values: { url: '   ' },
      message: 'Введите адрес',
    },
    {
      name: 'url without scheme',
      values: { url: 'example.com' },
      message: 'Адрес должен начинаться с http:// или https://',
    },
    {
      name: 'ftp url',
      values: { url: 'ftp://example.com' },
      message: 'Адрес должен начинаться с http:// или https://',
    },
    {
      name: 'too long url',
      values: { url: `https://example.com/${'a'.repeat(2048)}` },
      message: 'Адрес не длиннее 2048 символов',
    },
    {
      name: 'zero limit',
      values: { maxClicks: '0' },
      message: 'Целое число от 1',
    },
    {
      name: 'fractional limit',
      values: { maxClicks: '1.5' },
      message: 'Целое число от 1',
    },
    {
      name: 'negative limit',
      values: { maxClicks: '-3' },
      message: 'Целое число от 1',
    },
    {
      name: 'unsafe integer limit',
      values: { maxClicks: '99999999999999999999' },
      message: 'Целое число от 1',
    },
    {
      name: 'past expiry',
      values: { expiresAt: '2000-01-01T00:00' },
      message: 'Укажите будущее время',
    },
  ])('rejects $name', ({ values, message }) => {
    expect(firstMessage(parse(values))).toBe(message)
  })
})

describe('toCreateLinkRequest', () => {
  it('omits empty optional fields', () => {
    expect(
      toCreateLinkRequest({ url: 'https://example.com', maxClicks: '', expiresAt: '' }),
    ).toEqual({ url: 'https://example.com' })
  })

  it('converts the limit to a number and the expiry to iso time', () => {
    const request = toCreateLinkRequest({
      url: 'https://example.com',
      maxClicks: '5',
      expiresAt: '2999-01-02T03:04',
    })

    expect(request).toEqual({
      url: 'https://example.com',
      max_clicks: 5,
      expires_at: new Date('2999-01-02T03:04').toISOString(),
    })
  })
})
