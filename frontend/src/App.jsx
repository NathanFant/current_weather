import './App.css'
import WeatherFetcher from './components/WeatherFetcher'
import Socials from './components/Socials'
import LocationSearch from './components/LocationSearch'

function App() {
  return (
    <div className='App'>
      <div className='header-bar'>
        <LocationSearch />
        <Socials />
      </div>

      <h1>Current Weather</h1>
      <WeatherFetcher />
    </div>
  )
}

export default App
