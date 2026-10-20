import { describe, expect, it } from 'vitest'

import { tomorrowAtCurrentTime } from '@/lib/datetime'

describe('tomorrowAtCurrentTime', () => {
  it.each([
    {
      name: 'a regular day',
      now: new Date(2026, 9, 20, 16, 48),
      want: '2026-10-21T16:48',
    },
    {
      name: 'the end of a month',
      now: new Date(2026, 0, 31, 9, 5),
      want: '2026-02-01T09:05',
    },
    {
      name: 'the end of a year',
      now: new Date(2026, 11, 31, 23, 59),
      want: '2027-01-01T23:59',
    },
  ])('returns the next day at the same time for $name', ({ now, want }) => {
    expect(tomorrowAtCurrentTime(now)).toBe(want)
  })

  it('does not change the passed date', () => {
    const now = new Date(2026, 9, 20, 16, 48)

    tomorrowAtCurrentTime(now)

    expect(now).toEqual(new Date(2026, 9, 20, 16, 48))
  })
})
