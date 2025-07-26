import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
