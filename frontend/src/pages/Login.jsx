import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.data.token); // Save token
                localStorage.setItem('role', data.data.role);  // Save role
                localStorage.setItem('name', data.data.name);  // Save name

                setAlert({ open: true, message: 'Login successful!', severity: 'success' });

                if (data.data.role === 'freelancer') {
                    navigate('/landing');
                } else {
                    navigate('/dashboard');
                }
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setAlert({ open: true, message: error.message, severity: 'error' });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mb: 2 }}>
                    Log In
                </Button>
                <Typography align="center">
                    Don't have an account?{' '}
                    <Button variant="text" onClick={() => navigate('/signup')}>
                        Sign Up
                    </Button>
                </Typography>
            </Box>
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={() => setAlert({ ...alert, open: false })}
            >
                <Alert severity={alert.severity}>{alert.message}</Alert>
            </Snackbar>
        </Container>
    );
};

export default LoginPage;