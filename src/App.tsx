import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./redux/store";
import { useEffect, useState } from "react";
import { setAuthFromStorage } from "./redux/slices/authSlice";
import { useAppDispatch } from "./hooks/reduxHooks";
import "./App.css";
import loadingIcon from './assets/svg//table-icons/Dual Ball@1x-1.0s-200px-200px.svg'

// Pages and Components
import Login from "./pages/login-page/Login";
import Layout from "./components/layout/Layout";
import Settings from "./pages/settings/Settings";
import UserManagement from "./pages/user-management/UserManagement";
import Reports from "./pages/reports/Reports";
import FlaggedPost from "./pages/flaged-post/FlaggedPost";
import Home from "./pages/home/Home";
import { NavbarProvider } from "./components/contexts/NavbarContext";
import AddAdmin from "./pages/user-management/add-admin-page/AddAdmin";
import ActivityPage2 from "./pages/reports/activity-pages/activity-2/ActivityPage2";
import FlagDetailsPage from "./pages/flaged-post/Flag-details-page/FlagDetailsPage";
import ActivityPage1 from "./pages/reports/activity-pages/activity-1/ActivityPage1";
import ActivityPage3 from "./pages/reports/activity-pages/activity-3/ActivityPage3";
import ActivityPage4 from "./pages/reports/activity-pages/activity-4/ActivityPage4";
import Bussiness from "./pages/bussiness-intelligence/Bussiness";

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loading = useSelector((state: RootState) => state.auth.loading); 


  if (loading) {
    return <div>Loading...</div>; 
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const dispatch = useAppDispatch();
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    
    const initializeAuth = async () => {
      await dispatch(setAuthFromStorage());
      setAuthInitialized(true); 
    };

    initializeAuth();
  }, [dispatch]);

  if (!authInitialized) {
    
    return <div className='anime'>
    <img src={loadingIcon} alt="Loading..." />
  </div>
  }

  return (
    <Router>
      <NavbarProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            {/* Redirect "/" to "/home" */}
            <Route index element={<Navigate to="home" replace />} />

            {/* Dashboard Sub-Routes */}
            <Route path="home" element={<Home />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="bussiness-intelligence" element={<Bussiness />} />
            <Route path="flagged-post" element={<FlaggedPost />} />
            <Route path="settings" element={<Settings />} />
            <Route path="add-admin" element={<AddAdmin />} />

            {/* Activities Pages */}
            <Route path="activity/1" element={<ActivityPage1 />} />
            <Route path="activity/2" element={<ActivityPage2 />} />
            <Route path="activity/3" element={<ActivityPage3 />} />
            <Route path="activity/4" element={<ActivityPage4 />} />

            {/* Flagged Post Details */}
            <Route path="flag-details/:title" element={<FlagDetailsPage />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </NavbarProvider>
    </Router>
  );
}

// Export App wrapped in Redux Provider
export default function RootApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
