import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import MyTicketsPage from './pages/MyTicketsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* rutas publicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* rutas protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/locations/:id"
        element={
          <ProtectedRoute>
            <DetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-tickets"
        element={
          <ProtectedRoute>
            <MyTicketsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
