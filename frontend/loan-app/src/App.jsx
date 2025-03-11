import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <><div className='bg-blue-200'>
       <Routes>

        <Route path='/login' element={<Login/>}/>
       </Routes>
    </div>
       
    </>
  )
}

export default App
