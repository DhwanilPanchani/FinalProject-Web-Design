import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import FreelancerList from './components/FreelancerList';

// import LandingPage from "./"
function App() {
    const [profilePhoto, setProfilePhoto] = useState(null); // State to store profile photo

    // Function to update profile photo
    const onUpdateProfilePhoto = (newPhoto) => {
        setProfilePhoto(newPhoto);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected Routes */}
                <Route
                    path="*"
                    element={
                        <>
                            {/* Pass profilePhoto to Navbar */}
                            <Navbar profilePhoto={profilePhoto} />
                            <Routes>
                                <Route path="/landing" element={<LandingPage />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/jobs/:id" element={<JobDetails />} />
                                <Route path="/freelancers" element={<FreelancerList />} />
                                {/* <Route path="/jobs/:id" element={<JobDetails />} /> */}

                                {/* Pass onUpdateProfilePhoto to Profile */}
                                <Route
                                    path="/profile"
                                    element={<Profile onUpdateProfilePhoto={onUpdateProfilePhoto} />}
                                />
                            </Routes>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;