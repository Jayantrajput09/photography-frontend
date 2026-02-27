import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import ManagePhotos from './components/admin/ManagePhotos';
import ManageBookings from './components/admin/ManageBookings';
import ManageReviews from './components/admin/ManageReviews';
import Settings from './components/admin/Settings';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/admin/photos" element={<PrivateRoute><ManagePhotos /></PrivateRoute>} />
            <Route path="/admin/bookings" element={<PrivateRoute><ManageBookings /></PrivateRoute>} />
            <Route path="/admin/reviews" element={<PrivateRoute><ManageReviews /></PrivateRoute>} />
            <Route path="/admin/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          </Routes>
          <Footer />
          <ToastContainer position="bottom-right" theme="colored" />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;