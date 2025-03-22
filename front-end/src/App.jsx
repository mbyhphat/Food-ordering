import React from 'react'
import NavBar from './components/NavBar/NavBar'
import {Route, Routes} from 'react-router-dom'

const App = () => {
  return (
    <div className='app'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </div>
  )
}

export default App