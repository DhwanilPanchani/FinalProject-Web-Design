<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';
=======
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
import Footer from './components/footer/Footer';
import Home from './pages/Home';

>>>>>>> Stashed changes

function App() {
<<<<<<< Updated upstream
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
=======
    const [profilePhoto, setProfilePhoto] = useState(null); // State to store profile photo

    // Function to update profile photo
    const onUpdateProfilePhoto = (newPhoto) => {
        setProfilePhoto(newPhoto);
    };

    return (
        <div className='d-flex flex-column' style={{height: "100vh"}}>
        <Router>
            <Navbar profilePhoto={profilePhoto} />
            <div className='flex-grow-1'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected Routes */}
                <Route
                    path="*"
                    element={
                        <>
                            {/* Pass profilePhoto to Navbar */}
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
            </div>
            <Footer />
        </Router>
        </div>
    );
>>>>>>> Stashed changes
}

export default App;
