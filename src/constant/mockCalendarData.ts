import { CalendarData } from '@/types/calendar'

export const MockCalendarData: CalendarData = {
  '2000': {
    '1': [
      {
        date: new Date('2000-01-01'),
        startTime: '00:00',
        endTime: '00:00',
        title: "New Year's Day",
      },
      {
        date: new Date('2000-01-02'),
        startTime: '10:00',
        endTime: '12:00',
        title: 'Eat something',
      },
    ],
    '2': [
      {
        date: new Date('2000-02-01'),
        startTime: '00:00',
        endTime: '23:00',
        title: 'Welcome to Feb!',
      },
    ],
  },
  '2023': {
    '1': [
      {
        date: new Date('2000-01-01'),
        startTime: '00:00',
        endTime: '00:00',
        title: "New Year's Day 2023",
      },
      {
        date: new Date('2000-01-02'),
        startTime: '10:00',
        endTime: '12:00',
        title: 'Eat something',
      },
    ],
    '5': [
      {
        date: new Date('2000-05-01'),
        startTime: '00:00',
        endTime: '23:00',
        title: 'Welcome to May!',
      },
      {
        date: new Date('2000-05-22'),
        startTime: '8:00',
        endTime: '11:35',
        title: 'So bored!',
      },
      {
        date: new Date('2000-05-22'),
        startTime: '8:43',
        endTime: '12:00',
        title: 'eiei',
      },
      {
        date: new Date('2000-05-22'),
        startTime: '18:00',
        endTime: '20:00',
        title: 'So bored!',
      },
    ],
  },
}
