import { CalendarData } from '@/types/calendar'

export const DayInWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
export const MonthInYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const MockCalendarData: CalendarData = {
  2000: {
    // year 2000
    1: {
      // month 1
      1: [
        // date 1
        {
          date: new Date('2000-01-01'),
          startTime: '00:00',
          endTime: '00:00',
          title: "New Year's Day",
        },
      ],
      2: [
        // date 2
        {
          date: new Date('2000-01-02'),
          startTime: '10:00',
          endTime: '12:00',
          title: 'Eat something',
        },
      ],
    },
    2: {
      // month 2
      1: [
        {
          date: new Date('2000-02-01'),
          startTime: '00:00',
          endTime: '23:00',
          title: 'Welcome to Feb!',
        },
      ],
    },
  },
  2023: {
    // year 2023
    1: {
      // month 1
      1: [
        // date 1
        {
          date: new Date('2000-01-01'),
          startTime: '00:00',
          endTime: '00:00',
          title: "New Year's Day 2023",
        },
      ],
      2: [
        // date 2
        {
          date: new Date('2000-01-02'),
          startTime: '10:00',
          endTime: '12:00',
          title: 'Eat something',
        },
      ],
    },
    5: {
      // month 5
      1: [
        // date 1
        {
          date: new Date('2000-05-01'),
          startTime: '00:00',
          endTime: '23:00',
          title: 'Welcome to May!',
        },
      ],
      22: [
        // date 22
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
  },
}
