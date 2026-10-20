function pad(value: number) {
  return String(value).padStart(2, '0')
}

export function tomorrowAtCurrentTime(now: Date = new Date()) {
  const date = new Date(now)

  date.setDate(date.getDate() + 1)

  const day = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`

  return `${day}T${time}`
}
