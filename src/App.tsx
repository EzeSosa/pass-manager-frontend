import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Navbar from './navbar/Navbar'
import UpdatePassword from './forms/UpdatePassword'
import GeneratePassword from './forms/GeneratePassword'
import Login from './auth/Login'
import ProtectedRoute from './utils/ProtectedRoute'
import { Navigate } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <div className="container">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
            path="/home" 
            element={<ProtectedRoute element={<Home />} />} 
          />
          <Route 
            path="/savepassword" 
            element={<ProtectedRoute element={<GeneratePassword />} />} 
          />
          <Route 
            path="/updatepassword/:id" 
            element={<ProtectedRoute element={<UpdatePassword />} />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <MainLayout />
      </Router>
    </div>
  )
}

export default App