import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useCreateLink } from '@/api/links'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createLinkErrorMessage } from '@/features/create-link/errors'
import {
  createLinkSchema,
  toCreateLinkRequest,
  type CreateLinkFormValues,
} from '@/features/create-link/schema'
import { ShortLinkResult } from '@/features/create-link/ShortLinkResult'

export function CreateLinkForm() {
  const createLink = useCreateLink()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLinkFormValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: { url: '', maxClicks: '', expiresAt: '' },
  })

  return (
    <div className="flex flex-col gap-6">
      <form
        noValidate
        onSubmit={handleSubmit((values) => createLink.mutate(toCreateLinkRequest(values)))}
      >
        <FieldGroup>
          <Field data-invalid={!!errors.url}>
            <FieldLabel htmlFor="url">Адрес ссылки</FieldLabel>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/very/long/link"
              autoComplete="off"
              aria-invalid={!!errors.url}
              {...register('url')}
            />
            <FieldError errors={[errors.url]} />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field data-invalid={!!errors.maxClicks}>
              <FieldLabel htmlFor="maxClicks">Максимум переходов</FieldLabel>
              <Input
                id="maxClicks"
                inputMode="numeric"
                placeholder="Без ограничения"
                autoComplete="off"
                aria-invalid={!!errors.maxClicks}
                {...register('maxClicks')}
              />
              <FieldError errors={[errors.maxClicks]} />
            </Field>

            <Field data-invalid={!!errors.expiresAt}>
              <FieldLabel htmlFor="expiresAt">Действует до</FieldLabel>
              <Input
                id="expiresAt"
                type="datetime-local"
                aria-invalid={!!errors.expiresAt}
                {...register('expiresAt')}
              />
              <FieldDescription>Время в вашем часовом поясе</FieldDescription>
              <FieldError errors={[errors.expiresAt]} />
            </Field>
          </div>

          <Button type="submit" disabled={createLink.isPending}>
            {createLink.isPending ? 'Создаю...' : 'Сократить'}
          </Button>
        </FieldGroup>
      </form>

      {createLink.isError && (
        <Alert variant="destructive">
          <AlertDescription>{createLinkErrorMessage(createLink.error)}</AlertDescription>
        </Alert>
      )}

      {createLink.isSuccess && <ShortLinkResult shortUrl={createLink.data.short_url} />}
    </div>
  )
}
