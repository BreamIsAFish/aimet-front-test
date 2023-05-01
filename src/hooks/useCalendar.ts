import { useState } from 'react'
import { CalendarData } from '@/types/calendar'
import { MockCalendarData } from '@/constant/mockCalendarData'

const useCalendar = () => {
  const [data, setData] = useState<CalendarData>({})
  const [loading, setLoading] = useState<boolean>(false)

  const fetchCalendarData = () => {
    setLoading(true)
    // Fetch data from API
    console.log('fetching data...')
    setTimeout(() => {
      console.log('fetch successful')
      setData(MockCalendarData)
      setLoading(false)
    }, 200)
  }

  const addCalendarEvent = () => {}

  const removeCalendarEvent = () => {}

  const updateCalendarEvent = () => {}

  return {
    data,
    loading,
    fetchCalendarData,
    addCalendarEvent,
    removeCalendarEvent,
    updateCalendarEvent,
  }
}

export default useCalendar
