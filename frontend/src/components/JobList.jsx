import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await apiClient.get('/jobs');
                setJobs(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobs();
    }, []);

    return (
        <Grid container spacing={3} sx={{ mt: 3 }}>
            {jobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job._id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">{job.title}</Typography>
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
                                component={Link}
                                to={`/jobs/${job._id}`}
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default JobList;