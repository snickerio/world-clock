import { useState} from 'react'
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

  //Favourite Cities
  const [favoriteCities, setFavoriteCities] = useState<Timezone[]>(() => {
    const saved = localStorage.getItem('favoriteCities')
    return saved ? JSON.parse(saved) : []
  })

  //Own Cities
  const [customCities, setCustomCities] = useState<Timezone[]>(() => {
    const saved = localStorage.getItem('customCities')
    return saved ? JSON.parse(saved) : []
  })

  const [newCityName, setNewCityName] = useState('')
  const [newCityOffset, setNewCityOffset] = useState(0)

  //Function for favourites
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

    // Functions for own cities
  const addCustomCity = () => {
    if (!newCityName) return

    const newCity: Timezone = {
      value: newCityName,
      abbr: '',
      offset: newCityOffset * 60, // offset i minuter
      isdst: false,
      text: newCityName,
      utc: [`Custom/${newCityName}`],
    }

    const updated = [...customCities, newCity]
    setCustomCities(updated)
    localStorage.setItem('customCities', JSON.stringify(updated))
    setNewCityName('')
    setNewCityOffset(0)
  }
  const removeCustomCity = (city: Timezone) => {
  const updated = customCities.filter((c) => c.value !== city.value)
  setCustomCities(updated)
  localStorage.setItem('customCities', JSON.stringify(updated))
}

  return (
    <div>
      <h1>World Clock 🌍</h1>
      <p>Select a city:</p>
      <ul>
        {commonCities.map((city: Timezone) => (
          <li key={city.value}>
            <Link to={`/city/${encodeURIComponent(city.utc[0])}`}>{city.text}</Link>
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
                <Link to={`/city/${encodeURIComponent(city.utc[0])}`}>{city.text}</Link>
                <button onClick={() => removeFavorite(city)} style={{ marginLeft: '10px' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    {customCities.length > 0 && (
        <>
          <h2>Your Custom Cities:</h2>
          <ul>
            {customCities.map((city) => (
              <li key={city.value}>
                <Link to={`/city/${encodeURIComponent(city.utc[0])}`}>{city.text}</Link>
                <button onClick={() => removeCustomCity(city)} style={{ marginLeft: '10px' }}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2>Add Your Own City</h2>
      <input type="text" placeholder="City Name" value={newCityName} onChange={(e) => setNewCityName(e.target.value)}/>
      <input type="number" placeholder="UTC Offset" value={newCityOffset} onChange={(e) => setNewCityOffset(Number(e.target.value))}/>
      <button onClick={addCustomCity}>Add City</button>
    </div>
    )}

export default Home