import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Box,
} from '@mui/material';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch jobs on component mount
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await apiClient.get('/jobs');
                setJobs(response.data.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    // Filter jobs based on search query
    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle job application (open default email app)
    const handleApply = (job) => {
        if (job?.employer?.email) {
            const subject = encodeURIComponent(`Application for ${job.title}`);
            const body = encodeURIComponent(
                `Dear ${job.employer.name},\n\nI am interested in the "${job.title}" position you posted. Please let me know how I can proceed further.\n\nThank you!\n\nBest regards,\n[Your Name]`
            );
            window.location.href = `mailto:${job.employer.email}?subject=${subject}&body=${body}`;
        } else {
            alert('Employer email not available.');
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#E3F2FD',
                minHeight: '100vh',
                paddingTop: '80px',
                transition: 'background-color 0.5s ease',
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{ fontWeight: 'bold', color: '#0D47A1' }}
                >
                    Explore Opportunities
                </Typography>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        label="Search Jobs"
                        fullWidth
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Box>
                <Grid container spacing={4}>
                    {filteredJobs.map((job) => (
                        <Grid item xs={12} sm={6} md={4} key={job._id}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {job.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {job.description}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                                        Location: {job.location}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Hourly Rate: ${job.hourlyRate}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        onClick={() => handleApply(job)}
                                    >
                                        Contact Employer
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;