import { render } from '@testing-library/react'
import { MonthInYear } from '@/constant/mockCalendarData'

describe('Calendar', () => {
  const useCalendar = jest.fn()
  jest.mock('../src/hooks/useCalendar', () => useCalendar)

  const { default: Calendar } = require('../src/components/Calendar')

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when data is loading', () => {
    it('should display loading message when data is loading', () => {
      ;(useCalendar as jest.Mock).mockReturnValue({
        data: {},
        loading: true,
        fetchCalendarData: jest.fn(),
        addCalendarEvent: jest.fn(),
        removeCalendarEvent: jest.fn(),
        updateCalendarEvent: jest.fn(),
      })
      const { container } = render(<Calendar />)
      expect(useCalendar).toHaveBeenCalledTimes(1)
      expect(container.textContent).toBe('Loading...')
    })
  })

  describe('when data is not loading', () => {
    it('should display calendar with current month and year', () => {
      ;(useCalendar as jest.Mock).mockReturnValue({
        data: {},
        loading: false,
        fetchCalendarData: jest.fn(),
        addCalendarEvent: jest.fn(),
        removeCalendarEvent: jest.fn(),
        updateCalendarEvent: jest.fn(),
      })
      const { getByText } = render(<Calendar />)
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      expect(
        getByText(`${MonthInYear[currentMonth]} ${currentYear}`)
      ).toBeInTheDocument()
    })

    it('should display calendar with correct amount of dates', async () => {
      ;(useCalendar as jest.Mock).mockReturnValue({
        data: {},
        loading: false,
        fetchCalendarData: jest.fn(),
        addCalendarEvent: jest.fn(),
        removeCalendarEvent: jest.fn(),
        updateCalendarEvent: jest.fn(),
      })
      const { queryByText } = render(<Calendar />)
      const currentMonth = new Date().getMonth()
      const currentYear = new Date().getFullYear()
      const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate()
      expect(queryByText(lastDate)).toBeInTheDocument()
      expect(queryByText(lastDate + 1)).not.toBeInTheDocument()
    })

    describe('when date with event is selected', () => {
      it('should display all events in that day with correct display time', async () => {
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()
        ;(useCalendar as jest.Mock).mockReturnValue({
          data: {
            [currentYear]: {
              [currentMonth + 1]: {
                [currentDate.getDate()]: [
                  {
                    title: 'Test Event 1',
                    date: currentDate,
                    startTime: '8:35',
                    endTime: '12:00',
                  },
                  {
                    title: 'Test Event 2',
                    date: currentDate,
                    startTime: '11:00',
                    endTime: '13:30',
                  },
                  {
                    title: 'Test Event 3',
                    date: currentDate,
                    startTime: '20:00',
                    endTime: '24:40',
                  },
                ],
              },
            },
          },
          loading: false,
          fetchCalendarData: jest.fn(),
          addCalendarEvent: jest.fn(),
          removeCalendarEvent: jest.fn(),
          updateCalendarEvent: jest.fn(),
        })
        const { queryByText } = render(<Calendar />)
        expect(queryByText('Test Event 1')).toBeInTheDocument()
        expect(queryByText('8:35 AM - 12 PM')).toBeInTheDocument()
        expect(queryByText('Test Event 2')).toBeInTheDocument()
        expect(queryByText('11 AM - 1:30 PM')).toBeInTheDocument()
        expect(queryByText('Test Event 3')).toBeInTheDocument()
        expect(queryByText('8 PM - 0:40 AM')).toBeInTheDocument()
      })
    })
  })
})
