import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home'
import Signup from './components/signup'
import LoanChecker from './components/features/LoanChecker'
import Welcome from './components/welcome'
import LoanGuidance from './components/features/LoanGuidance'
import LoanCheckerSection from './components/features/Loancheckerfirst'
import PersonalLoanStepsComponent from './components/features/loanguidance/personal'
import Business from './components/features/loanguidance/business' 
import HomeLoanStepsComponent from './components/features/loanguidance/homeloan' 
import EducationLoanStepsComponent from './components/features/loanguidance/education'

function App() {
  const [tog, setTog] = useState("")

  return (
    <><div className='bg-blue-200'>
       <Routes>
       <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<Login setTog={setTog}/>}/>
        <Route path='/home' element={<Home tog={tog}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/LoanChecker' element={<LoanChecker/>}/>
        <Route path='/LoanGuidance' element={<LoanGuidance/>}/>
        <Route path='/LoanCheckerFirst' element={<LoanCheckerSection/>}/>
        <Route path='/Loan-Guidance/Personal' element={<PersonalLoanStepsComponent/>}/>
        <Route path='/Loan-Guidance/Business' element={<Business/>}/>
        <Route path='/Loan-Guidance/HomeLoan' element={<HomeLoanStepsComponent/>}/>
        <Route path='/Loan-Guidance/Education' element={<EducationLoanStepsComponent/>}/>
        
       </Routes>
    </div>
       
    </>
  )
}

export default App
