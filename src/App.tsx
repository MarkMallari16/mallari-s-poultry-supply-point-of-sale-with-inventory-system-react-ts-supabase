import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import { AuthProvider } from './context/AuthContext';
import DashboardCashier from './pages/cashier/DashboardCashier';


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/admin' element={<Dashboard />} />
            <Route path='/cashier' element={<DashboardCashier />} />
          </Routes>
        </AuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App
