import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { CreateLinkForm } from '@/features/create-link/CreateLinkForm'
import { renderWithQuery } from '@/test/render'

function stubFetch(response: Response) {
  const fetchMock = vi.fn().mockResolvedValue(response)

  vi.stubGlobal('fetch', fetchMock)

  return fetchMock
}

function requestBody(fetchMock: ReturnType<typeof vi.fn>) {
  return JSON.parse(fetchMock.mock.calls[0][1].body)
}

describe('CreateLinkForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('focuses the url field on mount', () => {
    renderWithQuery(<CreateLinkForm />)

    expect(screen.getByLabelText('Адрес ссылки')).toHaveFocus()
  })

  it('shows a validation error and does not send the request for a bad url', async () => {
    const fetchMock = stubFetch(Response.json({}))
    const user = userEvent.setup()
    renderWithQuery(<CreateLinkForm />)

    await user.type(screen.getByLabelText('Адрес ссылки'), 'example.com')
    await user.click(screen.getByRole('button', { name: 'Сократить' }))

    expect(
      await screen.findByText('Адрес должен начинаться с http:// или https://'),
    ).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('creates a link and shows the short url', async () => {
    const fetchMock = stubFetch(
      Response.json(
        { code: 'abc1234', short_url: 'http://localhost:8080/abc1234' },
        { status: 201 },
      ),
    )
    const user = userEvent.setup()
    renderWithQuery(<CreateLinkForm />)

    await user.type(screen.getByLabelText('Адрес ссылки'), 'https://example.com/page')
    await user.type(screen.getByLabelText('Максимум переходов'), '3')
    await user.type(screen.getByLabelText('Действует до'), '2999-01-02T03:04')
    await user.click(screen.getByRole('button', { name: 'Сократить' }))

    expect(await screen.findByRole('link', { name: 'http://localhost:8080/abc1234' })).toBeVisible()
    expect(requestBody(fetchMock)).toEqual({
      url: 'https://example.com/page',
      max_clicks: 3,
      expires_at: new Date('2999-01-02T03:04').toISOString(),
    })
  })

  it('accepts only digits in the max clicks field', async () => {
    const user = userEvent.setup()
    renderWithQuery(<CreateLinkForm />)
    const input = screen.getByLabelText('Максимум переходов')

    await user.type(input, 'a-1b.2,3 e')

    expect(input).toHaveValue('123')
  })

  it('sends only the url when optional fields are empty', async () => {
    const fetchMock = stubFetch(
      Response.json(
        { code: 'abc1234', short_url: 'http://localhost:8080/abc1234' },
        { status: 201 },
      ),
    )
    const user = userEvent.setup()
    renderWithQuery(<CreateLinkForm />)

    await user.type(screen.getByLabelText('Адрес ссылки'), 'https://example.com')
    await user.click(screen.getByRole('button', { name: 'Сократить' }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
    expect(requestBody(fetchMock)).toEqual({ url: 'https://example.com' })
  })

  it.each([
    {
      name: 'a known server error',
      response: () => Response.json({ error: 'max_clicks must be positive' }, { status: 400 }),
      message: 'Лимит переходов должен быть больше нуля',
    },
    {
      name: 'an unknown server error',
      response: () => Response.json({ error: 'internal error' }, { status: 500 }),
      message: 'Не удалось создать ссылку. Попробуйте позже',
    },
  ])('shows a readable message for $name', async ({ response, message }) => {
    stubFetch(response())
    const user = userEvent.setup()
    renderWithQuery(<CreateLinkForm />)

    await user.type(screen.getByLabelText('Адрес ссылки'), 'https://example.com')
    await user.click(screen.getByRole('button', { name: 'Сократить' }))

    expect(await screen.findByText(message)).toBeInTheDocument()
  })

  it('shows a network error message when the request fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))
    const user = userEvent.setup()
    renderWithQuery(<CreateLinkForm />)

    await user.type(screen.getByLabelText('Адрес ссылки'), 'https://example.com')
    await user.click(screen.getByRole('button', { name: 'Сократить' }))

    expect(
      await screen.findByText('Нет связи с сервером. Проверьте подключение'),
    ).toBeInTheDocument()
  })
})
