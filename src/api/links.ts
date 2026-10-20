import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

const createLinkResponseSchema = z.object({
  code: z.string(),
  short_url: z.string(),
})

const errorBodySchema = z.object({
  error: z.string(),
})

export type CreateLinkRequest = {
  url: string
  max_clicks?: number
  expires_at?: string
}

export type CreateLinkResponse = z.infer<typeof createLinkResponseSchema>

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function createLink(request: CreateLinkRequest): Promise<CreateLinkResponse> {
  const res = await fetch('/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })

  if (!res.ok) {
    const body = errorBodySchema.safeParse(await res.json().catch(() => null))

    throw new ApiError(res.status, body.success ? body.data.error : res.statusText)
  }

  return createLinkResponseSchema.parse(await res.json())
}

export function useCreateLink() {
  return useMutation({ mutationFn: createLink })
}
