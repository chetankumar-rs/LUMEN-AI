import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'
import Signup from './components/signup'
import LoanChecker from './components/features/LoanChecker'
import Welcome from './components/welcome'
import LoanGuidance from './components/features/LoanGuidance'
function App() {
  const [count, setCount] = useState(0)

  return (
    <><div className='bg-blue-200'>
       <Routes>
       <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/LoanChecker' element={<LoanChecker/>}/>
        <Route path='/LoanGuidance' element={<LoanGuidance/>}/>
       </Routes>
    </div>
       
    </>
  )
}

export default App
