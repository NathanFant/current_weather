import { useState } from 'react'
import './App.css'
import WeatherFetcher from './components/WeatherFetcher'

function App() {
  return (
    <div className='App'>
      <h1>Current Weather</h1>
      <WeatherFetcher />
    </div>
  )
}

export default App
