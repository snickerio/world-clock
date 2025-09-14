import { useState, useEffect } from 'react'
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

  const [favoriteCities, setFavoriteCities] = useState<Timezone[]>(() => {
    const saved = localStorage.getItem('favoriteCities')
    return saved ? JSON.parse(saved) : []
  })

  const updateFavorites = (cities: Timezone[]) => {
    setFavoriteCities(cities)
    localStorage.setItem('favoriteCities', JSON.stringify(cities))
  }

  const addFavorite = (city: Timezone) => {
    if (!favoriteCities.find((c) => c.value === city.value)) {
      updateFavorites([...favoriteCities, city])
    }
  }

  const removeFavorite = (city: Timezone) => {
    updateFavorites(favoriteCities.filter((c) => c.value !== city.value))
  }

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
            <button onClick={() => addFavorite(city)} style={{ marginLeft: '10px' }}>
              Add
            </button>
          </li>
        ))}
      </ul>

      {favoriteCities.length > 0 && (
        <>
          <h2>Your Favorites:</h2>
          <ul>
            {favoriteCities.map((city) => (
              <li key={city.value}>
                <Link to={`/city/${encodeURIComponent(city.utc[0])}`}>
                  {city.text}
                </Link>
                <button
                  onClick={() => removeFavorite(city)}
                  style={{ marginLeft: '10px' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
    )}

export default Home