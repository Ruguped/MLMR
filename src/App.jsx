
import { Layout } from './components/layout/Layout.jsx';
import Landing from './pages/Landing.jsx';
import { Routes, Route } from 'react-router-dom';
import AuthRequired from './components/AuthRequired.jsx';
import { ToastContainer } from './components/ui/ToastContainer.jsx';
import UserLayout from './pages/user/UserLayout.jsx';
import './App.css'
import Dashboard from './pages/user/dashboard/Dashboard.jsx';
import Plans from './pages/user/plans/Plans.jsx';
import Wallet from './pages/user/wallet/Wallet.jsx';
import Profile from './pages/user/profile/Profile.jsx';
import Referrals from './pages/user/referrals/Referrals.jsx';
import Support from './pages/user/support/Support.jsx';
import Security from './pages/user/security/Security.jsx';
import Ticket from './pages/user/support/ticket/Ticket.jsx';
import Kyc from './pages/user/kyc/Kyc.jsx';
import Deposit from './features/deposit/Deposit.jsx';
import Withdraw from './features/withdraw/Withdraw.jsx';

// ========== REACT QUERY SETUP ==========
// QueryClient is like a "brain" that stores all your fetched data
// QueryClientProvider makes this brain available to all components
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create the QueryClient with some default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: How long data is considered "fresh" (won't refetch)
      // After 5 minutes, React Query will refetch in the background
      staleTime: 5 * 60 * 1000,  // 5 minutes
        
      // retry: How many times to retry failed requests
      retry: 1,

      // refetchOnWindowFocus: Refetch when user comes back to the tab
      // Great for keeping data fresh!
      refetchOnWindowFocus: false,
    },
  },
});


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Landing />} />

          <Route element={<AuthRequired />}>
            <Route path='user' element={<UserLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="plans" element={<Plans/>}/>
              <Route path="wallet" element={<Wallet/>}/>
              <Route path="profile" element={<Profile/>}/>
              <Route path="security" element={<Security/>}/>
              <Route path="referrals" element={<Referrals/>}/>
              <Route path="kyc" element={<Kyc/>}/>
              <Route path="support" element={<Support/>}/>
              <Route path="support/tickets/:id" element={<Ticket/>}/>
              <Route path="logout" />
              <Route path="settings" />
              <Route path="deposit" element={<Deposit/>}/>
              <Route path="withdraw" element={<Withdraw/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
