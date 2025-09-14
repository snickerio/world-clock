import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CityDetail from './pages/CityDetail'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/city/:cityName' element={<CityDetail />} />
      </Routes>
  )
}

export default App