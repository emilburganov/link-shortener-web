import { z } from 'zod'

import type { CreateLinkRequest } from '@/api/links'

const MAX_URL_LENGTH = 2048

function isHttpUrl(value: string) {
  try {
    const { protocol } = new URL(value)

    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

function isPositiveInteger(value: string) {
  return /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) >= 1
}

export const createLinkSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Введите адрес')
    .max(MAX_URL_LENGTH, `Адрес не длиннее ${MAX_URL_LENGTH} символов`)
    .refine(isHttpUrl, 'Адрес должен начинаться с http:// или https://'),
  maxClicks: z
    .string()
    .trim()
    .refine((value) => value === '' || isPositiveInteger(value), 'Целое число от 1'),
  expiresAt: z
    .string()
    .refine(
      (value) => value === '' || new Date(value).getTime() > Date.now(),
      'Укажите будущее время',
    ),
})

export type CreateLinkFormValues = z.infer<typeof createLinkSchema>

export function toCreateLinkRequest(values: CreateLinkFormValues): CreateLinkRequest {
  const request: CreateLinkRequest = { url: values.url }

  if (values.maxClicks !== '') {
    request.max_clicks = Number(values.maxClicks)
  }

  if (values.expiresAt !== '') {
    request.expires_at = new Date(values.expiresAt).toISOString()
  }

  return request
}
