import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import SignUpPage from './page/SignUpPage'

const App = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-start'>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
        </Routes>
      </div>
    </>
  )
}

export default App