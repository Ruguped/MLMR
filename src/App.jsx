
import { Layout } from './components/layout/Layout.jsx';
import Landing from './pages/Landing.jsx';
import { Routes, Route } from 'react-router-dom';
import AuthRequired from './components/AuthRequired.jsx';
import { ToastContainer } from './components/ui/ToastContainer.jsx';
import UserLayout from './pages/user/UserLayout.jsx';
import './App.css'

function App() {


  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />

          <Route element={<AuthRequired />}>
            <Route path='user' element={<UserLayout />}>
              <Route index element={<h1 style={{ textAlign: 'center', padding: '150px' }
              }>This is a Dashboard</h1>} />
              <Route path="referral" />
              <Route path="kyc" />
            </Route>
          </Route>
        </Route>



      </Routes>
    </>
  )
}

export default App
