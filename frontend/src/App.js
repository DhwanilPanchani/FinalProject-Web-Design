// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import LandingPage from './pages/LandingPage';
// import Dashboard from './pages/Dashboard';
// import JobDetails from './pages/JobDetails';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import SignupPage from './pages/SignupPage';

// function App() {
//     return (
//         <Router>
//             {/* Navbar should be conditionally rendered to exclude it on login and signup pages */}
//             <Routes>
//                 {/* Default route redirects to login */}
//                 <Route path="/" element={<Navigate to="/login" />} />

//                 {/* Login and Signup Pages */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/signup" element={<SignupPage />} />

//                 {/* Protected Routes */}
//                 <Route
//                     path="*"
//                     element={
//                         <>
//                             <Navbar />
//                             <Routes>
//                                 <Route path="/landing" element={<LandingPage />} />
//                                 <Route path="/dashboard" element={<Dashboard />} />
//                                 <Route path="/jobs/:id" element={<JobDetails />} />
//                                 <Route path="/profile" element={<Profile />} />
//                             </Routes>
//                         </>
//                     }
//                 />
//             </Routes>
//         </Router>
//     );
// }

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';

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