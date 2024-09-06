import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import Navbar from './navbar/Navbar'
import UpdatePassword from './forms/UpdatePassword'
import GeneratePassword from './forms/GeneratePassword'

function MainLayout() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/savepassword" element={<GeneratePassword />} />
          <Route path="/updatepassword/:id" element={<UpdatePassword />} />
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