import { useParams, Link } from 'react-router-dom'
import timezones from '../data/timezones.json'
import { useEffect, useState } from 'react'
import type { Timezone } from '../types'
import Clock from '../components/clock.tsx'

function CityDetail() {
  const { cityName } = useParams()
  const [currentTime, setCurrentTime] = useState<string>('')
  const decodedCityId = decodeURIComponent(cityName || '')
  const city = timezones.find((c: Timezone) => c.utc.includes(decodedCityId))

  useEffect(() => {
    if (!city) return

    const updateTime = () => {
      const utc = new Date()
      const localTime = new Date(utc.getTime() + city.offset * 60000)
      setCurrentTime(localTime.toLocaleTimeString())
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [city])

  if (!city) {
    return (
      <div>
        <p>Staden hittades inte.</p>
        <Link to="/" className="link">← Tillbaka</Link>
      </div>
    )
  }

  return (
    <div>
  <h2>{city.text}</h2>
  <Clock offset={city.offset} size={250} />
  <br />
  <Link to="/" className="link">← Tillbaka</Link>
</div>
  )
}

export default CityDetail