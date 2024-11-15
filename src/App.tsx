// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css'
// import Login from './pages/login-page/Login';
// import SignUp from './pages/sign-up/SignUp';
// import ConfirmationModal from './components/modals/cofirmation-modal/ConfirmationModal';
// import Layout from './components/layout/Layout';
// import Home from './pages/home/Home';
// import Settings from './pages/settings/Settings';
// import UserManagement from './pages/user-management/UserManagement';
// import Reports from './pages/reports/Reports';
// import FlaggedPost from './pages/flaged-post/FlaggedPost';
// import Onboard from './pages/onboarding/Onboard';

// function App() {
//   const isAuthenticated: boolean = !!localStorage.getItem('token'); // Adding type annotation

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<SignUp />} />
//         <Route path="/confirm" element={<ConfirmationModal />} />
//         <Route path="/onboard" element={<Onboard />} />

//         {/* Protected Layout with nested routes */}
//         <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
//           <Route path="home" element={<Home />} />
//           <Route path="user-management" element={<UserManagement />} />
//           <Route path="reports" element={<Reports />} />
//           <Route path="flagged-post" element={<FlaggedPost />} />
//           <Route path="settings" element={<Settings />} />
//         </Route>

//         {/* Redirect unknown routes to login */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }



// export default App

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login-page/Login';
import SignUp from './pages/sign-up/SignUp';
import ConfirmationModal from './components/modals/cofirmation-modal/ConfirmationModal';
import Layout from './components/layout/Layout';
// import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import UserManagement from './pages/user-management/UserManagement';
import Reports from './pages/reports/Reports';
// import FlaggedPost from './pages/fla';
import Onboard from './pages/onboarding/Onboard';
import FlaggedPost from './pages/flaged-post/FlaggedPost';
import Home from './pages/home/Home';
import { NavbarProvider } from './components/contexts/NavbarContext';
import AddAdmin from './pages/user-management/add-admin-page/AddAdmin';
import ActivityPage from './pages/reports/activity-pages/activity-1/ActivityPage';
import FlagDetailsPage from './pages/flaged-post/Flag-details-page/FlagDetailsPage';

function App() {
  return (
    <Router>
      <NavbarProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/confirm" element={<ConfirmationModal />} />
        <Route path="/onboard" element={<Onboard />} />

        {/* Layout with nested dashboard routes */}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="reports" element={<Reports />} />
          <Route path="flagged-post" element={<FlaggedPost />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-admin" element={<AddAdmin />} />

          {/* Activities page */}
          <Route path="/activity/2" element={<ActivityPage />} />
          
          <Route path="/flag-details/:title" element={<FlagDetailsPage />} />
        </Route>

        



        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </NavbarProvider>
    </Router>
  );
}

export default App;
