import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import { AuthProvider } from './context/AuthContext';
import DashboardCashier from './pages/cashier/DashboardCashier';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/admin' element={
              <ProtectedRoutes allowedRole='admin'>
                <Dashboard />
              </ProtectedRoutes>} />
            <Route path='/cashier' element={
              <ProtectedRoutes allowedRole='cashier'>
                <DashboardCashier />
              </ProtectedRoutes>
            } />
          </Routes>
        </AuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App
