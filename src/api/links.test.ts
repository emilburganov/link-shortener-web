import { afterEach, describe, expect, it, vi } from 'vitest'

import { ApiError, createLink } from '@/api/links'

function stubFetch(response: Response) {
  const fetchMock = vi.fn().mockResolvedValue(response)

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}

describe('createLink', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('posts the request as json and returns the created link', async () => {
    const fetchMock = stubFetch(
      Response.json(
        { code: 'abc1234', short_url: 'http://localhost:8080/abc1234' },
        { status: 201 },
      ),
    )

    const link = await createLink({ url: 'https://example.com', max_clicks: 5 })

    expect(link).toEqual({ code: 'abc1234', short_url: 'http://localhost:8080/abc1234' })
    expect(fetchMock).toHaveBeenCalledWith('/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'https://example.com', max_clicks: 5 }),
    })
  })

  it.each([
    {
      name: 'uses the message from the error body',
      response: () => Response.json({ error: 'max_clicks must be positive' }, { status: 400 }),
      status: 400,
      message: 'max_clicks must be positive',
    },
    {
      name: 'falls back to the status text when the body is not json',
      response: () => new Response('oops', { status: 500, statusText: 'Internal Server Error' }),
      status: 500,
      message: 'Internal Server Error',
    },
  ])('throws ApiError: $name', async ({ response, status, message }) => {
    stubFetch(response())

    const error = await createLink({ url: 'https://example.com' }).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({ status, message })
  })
})
