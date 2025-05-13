import { useState } from 'react'
import './App.css'
import WeatherFetcher from './components/WeatherFetcher'
import Socials from './components/Socials'

function App() {
  return (
    <div className='App'>
      <Socials />
      <h1>Current Weather</h1>
      <WeatherFetcher />
    </div>
  )
}

export default App
