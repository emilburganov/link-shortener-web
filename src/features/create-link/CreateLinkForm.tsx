import { zodResolver } from '@hookform/resolvers/zod'
import { ClockIcon, LinkIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { useCreateLink } from '@/api/links'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createLinkErrorMessage } from '@/features/create-link/errors'
import { tomorrowAtCurrentTime } from '@/lib/datetime'
import {
  createLinkSchema,
  toCreateLinkRequest,
  type CreateLinkFormValues,
} from '@/features/create-link/schema'
import { ShortLinkResult } from '@/features/create-link/ShortLinkResult'
import { cn } from '@/lib/utils'

const optionInputClass =
  'h-10 rounded-lg border-2 border-slate-200 bg-white shadow-none focus-visible:border-teal-500 focus-visible:ring-0 aria-invalid:border-red-400 aria-invalid:ring-0'

export function CreateLinkForm() {
  const createLink = useCreateLink()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateLinkFormValues>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: { url: '', maxClicks: '', expiresAt: '' },
  })

  const maxClicks = register('maxClicks')

  return (
    <div className="flex flex-col gap-6 text-left">
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={handleSubmit((values) => createLink.mutate(toCreateLinkRequest(values)))}
      >
        <Field data-invalid={!!errors.url}>
          <div
            className={cn(
              'flex items-center rounded-xl border-2 bg-white transition-colors',
              errors.url ? 'border-red-400' : 'border-slate-200 focus-within:border-teal-500',
            )}
          >
            <LinkIcon className="ml-4 size-[18px] shrink-0 text-slate-400" strokeWidth={2} />

            <FieldLabel htmlFor="url" className="sr-only">
              Адрес ссылки
            </FieldLabel>
            <Input
              id="url"
              type="url"
              placeholder="Введите адрес ссылки"
              autoComplete="off"
              autoFocus
              aria-invalid={!!errors.url}
              className="h-auto flex-1 border-0 bg-transparent px-4 py-4 text-base shadow-none focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent"
              {...register('url')}
            />

            <Button
              type="submit"
              disabled={createLink.isPending}
              className="m-1.5 h-auto shrink-0 rounded-lg px-5 py-3 text-sm font-semibold"
            >
              {createLink.isPending ? 'Создание...' : 'Сократить'}
            </Button>
          </div>
          <FieldError errors={[errors.url]} className="pl-1" />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.maxClicks}>
            <FieldLabel htmlFor="maxClicks" className="text-xs font-semibold text-slate-500">
              Максимум переходов
            </FieldLabel>
            <Input
              id="maxClicks"
              inputMode="numeric"
              placeholder="Без ограничения"
              autoComplete="off"
              aria-invalid={!!errors.maxClicks}
              className={optionInputClass}
              {...maxClicks}
              onChange={(event) => {
                event.target.value = event.target.value.replace(/\D/g, '')
                void maxClicks.onChange(event)
              }}
            />
            <FieldError errors={[errors.maxClicks]} />
          </Field>

          <Field data-invalid={!!errors.expiresAt}>
            <FieldLabel htmlFor="expiresAt" className="text-xs font-semibold text-slate-500">
              Действует до
            </FieldLabel>
            <Input
              id="expiresAt"
              type="datetime-local"
              aria-invalid={!!errors.expiresAt}
              className={optionInputClass}
              onFocus={(event) => {
                if (event.target.value === '') {
                  setValue('expiresAt', tomorrowAtCurrentTime())
                }
              }}
              {...register('expiresAt')}
            />
            <FieldDescription className="flex items-center gap-1.5 font-medium text-teal-700">
              <ClockIcon className="size-3.5 shrink-0" />
              Время указывается в вашем часовом поясе
            </FieldDescription>
            <FieldError errors={[errors.expiresAt]} />
          </Field>
        </div>
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
