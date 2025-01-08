import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import SecondaryHeader from './components/Header/SecondaryHeader';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import House from './pages/Home/House';
import Signup from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import CreateBDS from './components/CreateBDS';
import StatisticsDashboard from './components/StatisticsDashboard';
import BdsSelling from './pages/Home/bdsSelling';
import PaymentForm from './pages/VNPAY/PaymentForm';
import PaymentResult from './pages/VNPAY/PaymentResult';
function Layout({ children }) {
  const location = useLocation();
  const showHeader = ['/', '/house', '/bdsSelling'].includes(location.pathname);

  return (
    <>
      {showHeader && (
        <>
          <Header />
          <SecondaryHeader />
        </>
      )}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<><Home /><Footer /></>} />
          <Route path="/house" element={<><House /><Footer /></>} />
          <Route path="/bdsSelling" element={<><BdsSelling /><Footer /></>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-bds" element={<CreateBDS />} />
          <Route path="/payment-form" element={<PaymentForm />} />
          <Route path="/payment/result" element={<PaymentResult />} />
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Route con: StatisticsDashboard */}
            <Route path="StatisticsDashboard" element={<StatisticsDashboard />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
