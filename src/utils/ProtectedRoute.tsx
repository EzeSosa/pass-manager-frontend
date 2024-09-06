import React from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: React.JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const accessToken = localStorage.getItem('accessToken')
  return accessToken ? element : <Navigate to="/login" />
}

export default ProtectedRoute