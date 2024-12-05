import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import FreelancerList from "./components/FreelancerList";
import { logout, selectUser } from "./features/authSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // Protect Routes based on user authentication and roles
  const ProtectedRoute = ({ children, allowedTypes }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (!allowedTypes.includes(user.data.role)) {
      return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h1>403 - Not Authorized</h1>
          <p>You are not authorized to access this page.</p>
        </div>
      );
    }

    return children;
  };

  return (
    <Router>
      <Navbar onLogout={handleLogout} /> {/* Pass handleLogout to Navbar */}
      <Routes>
        {user ? (
          <>
          {console.log(user.data.role)}
            <Route path="/" element={<Navigate to="/landing" />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedTypes={["freelancer", "admin"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/landing"
              element={
                <ProtectedRoute allowedTypes={["employer", "freelancer", "admin"]}>
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute allowedTypes={["employer"]}>
                  <JobDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedTypes={["employer", "freelancer"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/freelancers"
              element={
                <ProtectedRoute allowedTypes={["employer", "admin"]}>
                  <FreelancerList />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
