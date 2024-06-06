'use client'

import { getHourMinute } from '@/utils/get-hour-minute'
import { useEffect, useState } from 'react'

export function TimeNow() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hour, minutes] = getHourMinute(currentDate)

  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
  }, [currentDate])

  return (
    <h1 className="text-8xl font-light text-white">
      {hour}:{minutes}
    </h1>
  )
}
