import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/Signup'
import HomePage from './pages/Home/HomePage'
import OtpPage from './pages/OTPPage'
import { Toaster } from 'react-hot-toast'
import { Navigate } from 'react-router-dom'
import { isTokenExpired } from './utils/checkToken'
import Profile from './pages/Profile'
import Chat from './pages/Chat'

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-black text-white'>
        <main>
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/verify-otp' element={<OtpPage />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/chat' element={<Chat />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  )
}

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')

  console.log(!isTokenExpired(token))
  if (!token || !isTokenExpired(token)) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default App
