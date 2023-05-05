import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AnimateHeight, { Height } from 'react-animate-height'

import useCalendar from '@/hooks/useCalendar'

import { ICONS } from '@/constant/images'
import { DayInWeek, MonthInYear } from '@/constant/mockCalendarData'

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  ) // 0-11
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  ) // 2023
  const [selectingDate, setSelectingDate] = useState<number>(
    new Date().getDate()
  ) // 1-31
  const [startDay, setStartDay] = useState<number>(
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7
  ) // Day of the week (0-6) of the first day of the month (0 is Monday, 6 is Sunday)

  const [inProp, setInProp] = useState(false)
  // const [infoHeight, setInfoHeight] = useState('0')
  const [infoHeight, setInfoHeight] = useState<Height>(0)
  const nodeRef = useRef(null)

  const { data: eventData, loading, fetchCalendarData } = useCalendar()

  useEffect(() => {
    fetchCalendarData()
  }, [])

  useEffect(() => {
    setStartDay((new Date(currentYear, currentMonth, 1).getDay() + 6) % 7)
  }, [currentMonth, currentYear])

  const getDateList = () => {
    const date = new Date(currentYear, currentMonth + 1, 0) // Set the date to the last day of the month
    const totalDayInMonth = date.getDate()
    return Array.from({ length: totalDayInMonth }, (_, i) => 1 + i)
  }

  const getEventFromDate = (date: number) => {
    if (eventData) {
      return eventData[currentYear]?.[currentMonth + 1]?.[date] ?? []
    }
    return []
  }

  const isSelectingDate = (date: number) => {
    const today = new Date()
    return (
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      selectingDate === date
    )
  }

  const convertTimeToDisplayFormat = (time: string /* e.g. 12:00 */) => {
    const [hour, minute] = time.split(':')
    const hourInNumber = parseInt(hour)
    const minuteInNumber = parseInt(minute)
    const isPM = hourInNumber >= 12 && hourInNumber < 24
    const displayHour =
      hourInNumber <= 12
        ? hourInNumber
        : hourInNumber < 24
        ? hourInNumber - 12
        : hourInNumber - 24
    const displayMinute = minuteInNumber < 10 ? `0${minuteInNumber}` : minute
    if (displayMinute !== '00')
      return `${displayHour}:${displayMinute} ${isPM ? 'PM' : 'AM'}`
    else return `${displayHour} ${isPM ? 'PM' : 'AM'}`
  }

  const onClickNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const onClickPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const onClickDate = (date: number) => {
    if (getEventFromDate(date).length > 0) {
      setInfoHeight('auto')
    } else {
      setInfoHeight(0)
    }
    // setInProp(true)
    setSelectingDate(date)
    // setTimeout(() => {
    //   setInfoHeight('auto')
    // }, 500)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    // <TransitionGroup>
    <div
      className={`flex flex-col justify-center items-center p-10 rounded-xl bg-white overflow-hidden`}
    >
      {/* Top Section */}
      <div className="flex justify-between w-full mb-6">
        {/* Month & Year */}
        <h1 className="text-dark-gray font-bold">{`${MonthInYear[currentMonth]} ${currentYear}`}</h1>
        {/* Month Selection Arrow */}
        <div className="flex justify-center items-center">
          <Image
            onClick={onClickPrevMonth}
            src={ICONS.ArrowRight}
            alt="arrow-left"
            width={6}
            height={6}
            className="rotate-180 mr-4 object-contain"
          />
          <Image
            onClick={onClickNextMonth}
            src={ICONS.ArrowRight}
            alt="arrow-right"
            width={6}
            height={6}
            className="object-contain"
          />
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 grid-flow-row gap-1 text-center">
        {/* Day */}
        {DayInWeek.map((day) => (
          <p
            key={day}
            className="text-dark-gray font-normal px-1"
          >
            {day}
          </p>
        ))}

        {/* Empty Grid (For start of each month) */}
        {startDay > 0 && (
          <div
            className="col-span-7"
            style={{ gridColumn: `1 / span ${startDay}` }}
          >
            {' '}
          </div>
        )}

        {/* Date */}
        {getDateList().map((date) => (
          <div
            key={date}
            onClick={() => onClickDate(date)}
            className={`flex justify-center items-center ${
              isSelectingDate(date)
                ? 'text-white bg-red rounded-full'
                : 'text-subtext-gray'
            } text-normal w-9 h-9 relative cursor-pointer`}
          >
            {date}
            {getEventFromDate(date).length > 0 && (
              <div className="w-[6px] h-[6px] rounded-full bg-red absolute bottom-0" />
            )}
          </div>
        ))}
      </div>

      {/* Event List */}
      {/* <CSSTransition
        nodeRef={nodeRef}
        in={inProp}
        classNames="fade"
        timeout={300}
        onEntered={() => setInProp(false)}
        // onExited={() => setInProp(false)}
      > */}
      <AnimateHeight
        duration={500}
        height={infoHeight}
        className="w-full"
      >
        {/* <div
          ref={nodeRef}
        className="w-full"
          style={{ height: 'auto', transition: 'height 1s ease-in-out' }}
        > */}
        {getEventFromDate(selectingDate).length > 0 && (
          <div className="flex flex-col w-full pt-6 gap-3">
            {getEventFromDate(selectingDate).map((event, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center items-start"
              >
                <p className="text-xs text-subtext-gray">{`${convertTimeToDisplayFormat(
                  event.startTime
                )} - ${convertTimeToDisplayFormat(event.endTime)}`}</p>
                <p className="text-normal font-normal text-dark-gray">
                  {event.title}
                </p>
              </div>
            ))}
          </div>
        )}
        {/* </div> */}
      </AnimateHeight>
      {/* </CSSTransition> */}
    </div>
    // </TransitionGroup>
  )
}

export default Calendar
