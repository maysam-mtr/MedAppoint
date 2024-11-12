import React from 'react'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children, allowedRoles}) {
  const {role} = useContext(AuthContext)

  const isAllowed = allowedRoles.includes(role)
  const accessibleRoute = isAllowed ? children : <Navigate to='/login' replace={true} />
    return accessibleRoute;
}
