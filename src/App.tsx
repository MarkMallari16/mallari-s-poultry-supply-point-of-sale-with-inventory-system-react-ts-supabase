import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const decrementCount = () => {
    setCount(prev => prev <= 0 ? 0 : prev - 1);
  }
  const incrementCount = () => {
    setCount(prev => prev + 1);
  }
  return (
    <>
      <p>{count}</p>
      <button className='btn btn-primary' onClick={incrementCount}>Increment</button>
      <button className='btn btn-error' onClick={decrementCount}>Decrement</button>

    </>
  )
}

export default App
