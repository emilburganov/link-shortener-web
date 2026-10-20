import { ApiError } from '@/api/links'

const DEFAULT_MESSAGE = 'Не удалось создать ссылку. Попробуйте позже'

const NETWORK_MESSAGE = 'Нет связи с сервером. Проверьте подключение'

const messageByApiError: Record<string, string> = {
  'invalid request body': 'Не удалось разобрать запрос',
  'url must be a valid http or https address': 'Адрес должен начинаться с http:// или https://',
  'max_clicks must be positive': 'Лимит переходов должен быть больше нуля',
  'expires_at must be in the future': 'Срок жизни должен быть в будущем',
}

export function createLinkErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return messageByApiError[error.message] ?? DEFAULT_MESSAGE
  }

  return NETWORK_MESSAGE
}
