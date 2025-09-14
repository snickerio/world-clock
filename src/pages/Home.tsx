import { Link } from 'react-router-dom'
import timezones from '../data/timezones.json'
import type { Timezone } from '../types'

const featuredUtc = [
  'Europe/Stockholm',
  'Europe/Berlin',
  'Europe/London',
  'Europe/Paris',
  'America/New_York',
  'Asia/Tokyo',
  'Asia/Shanghai',
]

function Home() {
  const commonCities = timezones.filter((tz: Timezone) =>
    tz.utc.some((u) => featuredUtc.includes(u))
  )

  return (
    <div>
      <h1>World Clock 🌍</h1>
      <p>Select a city:</p>
      <ul>
        {commonCities.map((city: Timezone) => (
          <li key={city.value}>
            <Link to={`/city/${encodeURIComponent(city.utc[0])}`}>
              {city.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home