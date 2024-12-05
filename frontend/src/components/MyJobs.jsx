import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import apiClient from '../api/apiClient';

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await apiClient.get('/jobs/current',                 {headers: {
                    Authorization: `Bearer ${token}`, // Attach token as a Bearer token
                }},); // Replace <user_id> dynamically
                setJobs(response.data.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setError('Failed to load jobs.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) return <Typography>Loading jobs...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 2,
                backgroundColor: '#f4f6f8',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
                My Posted Jobs
            </Typography>
            {jobs.length === 0 ? (
                <Typography>No jobs posted yet.</Typography>
            ) : (
                jobs.map((job) => (
                    <Card key={job.id} sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h6" component="h2">
                                {job.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Location: {job.location}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {job.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Hourly Rate: ${job.hourlyRate}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default MyJobs;
