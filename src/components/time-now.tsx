'use client'

import { getHourMinute } from '@/utils/get-hour-minute'
import { ComponentProps, useEffect, useState } from 'react'

interface TimeNowProps extends ComponentProps<'h1'> {}

export function TimeNow({ ...props }: TimeNowProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hour, minutes] = getHourMinute(currentDate)

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
  }, [currentDate])

  return (
    <h1 {...props}>
      {hour}:{minutes}
    </h1>
  )
}
