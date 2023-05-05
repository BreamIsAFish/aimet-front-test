export type CalendarData = {
  [year: number /*2023*/]: {
    [month: number /*1-12*/]: {
      [date: number /*1-31*/]: CalendarEventType[]
    }
  }
}

export type CalendarEventType = {
  date: Date
  startTime: string // "HH:mm"
  endTime: string // "HH:mm"
  title: string
}
