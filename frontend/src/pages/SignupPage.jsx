import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Snackbar, Alert, Select, MenuItem } from '@mui/material';

const SignupPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'freelancer', // Default role
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (data.success) {
                setAlert({ open: true, message: 'Signup successful! Please log in.', severity: 'success' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setAlert({ open: true, message: error.message, severity: 'error' });
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box
                sx={{
                    p: 3,
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 600, color: '#333' }}>
                    Create a New Account
                </Typography>

                <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        variant="outlined"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        variant="outlined"
                    />
                    <Select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        variant="outlined"
                    >
                        <MenuItem value="freelancer">Freelancer</MenuItem>
                        <MenuItem value="employer">Employer</MenuItem>
                    </Select>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSignup}
                        sx={{
                            mb: 2,
                            backgroundColor: '#1dbf73',
                            '&:hover': {
                                backgroundColor: '#17a55e',
                            },
                        }}
                    >
                        Sign Up
                    </Button>

                    <Typography align="center" sx={{ mt: 1, fontSize: '14px', color: '#555' }}>
                        Already have an account?{' '}
                        <Button
                            variant="text"
                            onClick={() => navigate('/login')}
                            sx={{ fontWeight: 600, color: '#1dbf73' }}
                        >
                            Log In
                        </Button>
                    </Typography>
                </form>
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

export default SignupPage;
