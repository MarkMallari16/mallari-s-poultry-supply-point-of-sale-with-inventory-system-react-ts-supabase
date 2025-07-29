import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Login from './pages/Login';
import CashierDashboard from './pages/cashier/CashierDashboard';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/admin/AdminDashboard'
import SharedLayout from './layouts/SharedLayout';
import POS from './pages/admin/POS';
import Inventory from './pages/admin/Inventory';
import SalesHistory from './pages/admin/SalesHistory';
import Analytics from './pages/admin/Analytics';
import Users from './pages/admin/Users';

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes allowedRole="admin">
                <SharedLayout role="admin" />
              </ProtectedRoutes>
            }
          >
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='pos' element={<POS />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='sales-history' element={<SalesHistory />} />
            <Route path='analytics' element={<Analytics />} />
            <Route path='users' element={<Users />} />
          </Route>

          <Route path='/cashier' element={
            <ProtectedRoutes allowedRole='cashier'>
              <SharedLayout role='cashier' />
            </ProtectedRoutes>
          }>
            <Route path='dashboard' element={<CashierDashboard />} />
            <Route path='pos' element={<CashierDashboard />} />
            <Route path='sales-history' element={<CashierDashboard />} />
            <Route path='analytics' element={<CashierDashboard />} />

          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
