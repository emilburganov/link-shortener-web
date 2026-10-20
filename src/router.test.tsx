import { screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'

import { routes } from '@/router'
import { renderWithQuery } from '@/test/render'

function renderAt(path: string) {
  renderWithQuery(
    <RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />,
  )
}

describe('router', () => {
  it('shows the home page on /', () => {
    renderAt('/')

    expect(screen.getByRole('heading', { name: /Короткие ссылки/ })).toBeInTheDocument()
  })

  it('shows the not found page on an unknown path', () => {
    renderAt('/no/such/page')

    expect(screen.getByRole('heading', { name: 'Страница не найдена' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'На главную' })).toHaveAttribute('href', '/')
  })
})
