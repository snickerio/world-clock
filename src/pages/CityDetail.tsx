import { useParams, Link } from 'react-router-dom'
import timezones from '../data/timezones.json'
import { useEffect, useState } from 'react'
import type { Timezone } from '../types'
import Clock from '../components/clock.tsx'
import stockholmImg from '../images/stockholm.jpg'
import berlinImg from '../images/berlin.jpg'
import londonImg from '../images/london.jpg'
import parisImg from '../images/paris.jpg'
import newYorkImg from '../images/new-york.jpg'
import tokyoImg from '../images/tokyo.jpg'
import shanghaiImg from '../images/shanghai.jpg'

const cityImages: Record<string, string> = {
  'Stockholm': '../images/stockholm.jpg',
  'Berlin': '../images/berlin.jpg',
  'London': '../images/london.jpg',
  'Paris': '../images/paris.jpg',
  'New York': '../images/new-york.jpg',
  'Tokyo': '../images/tokyo.jpg',
  'Shanghai': '../images/shanghai.jpg',
}

function CityDetail() {
  const { cityName } = useParams()
  const [currentTime, setCurrentTime] = useState<string>('')
  const decodedCityId = decodeURIComponent(cityName || '')
  const savedCustomCities = JSON.parse(localStorage.getItem('customCities') || '[]') as Timezone[]
  const city = [...timezones, ...savedCustomCities].find((c) => c.utc.includes(decodedCityId))

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

const backgroundImage = cityImages[city.value]

  return (
    <div style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    padding: '20px',
    boxSizing: 'border-box',
  }}>
  <h2 style={{ textAlign: 'center' }}>{city.text}</h2>
  <Clock offset={city.offset} size={250} />
  <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Aktuell tid: {currentTime}</p>
  <Link to="/" className="link">← Tillbaka</Link>
</div>
  )
}

export default CityDetail