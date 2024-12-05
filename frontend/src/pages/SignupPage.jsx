import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Snackbar, Alert, Select, MenuItem } from '@mui/material';

const SignupPage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'freelancer',
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

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Sign Up
                </Typography>
                <TextField
                    label="Name"
                    fullWidth
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <Select
                    fullWidth
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="freelancer">Freelancer</MenuItem>
                    <MenuItem value="employer">Employer</MenuItem>
                </Select>
                <Button variant="contained" fullWidth onClick={handleSignup} sx={{ mb: 2 }}>
                    Sign Up
                </Button>
                <Typography align="center">
                    Already have an account?{' '}
                    <Button variant="text" onClick={() => navigate('/login')}>
                        Log In
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

export default SignupPage;