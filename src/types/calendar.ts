export type CalendarData = {
  [year: string /*2023*/]: {
    [month: string /*1-12*/]: CalendarEventType[]
  }
}

export type CalendarEventType = {
  date: Date
  startTime: string // "HH:mm"
  endTime: string // "HH:mm"
  title: string
}
