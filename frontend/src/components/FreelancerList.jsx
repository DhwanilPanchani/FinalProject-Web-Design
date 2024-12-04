import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { Grid2, Card, CardContent, Typography, Avatar } from '@mui/material';

const FreelancerList = () => {
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        const fetchFreelancers = async () => {
            try {
                const response = await apiClient.get('/freelancers');
                setFreelancers(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFreelancers();
    }, []);

    return (
        <Grid2 container spacing={3} sx={{ mt: 3 }}>
            {freelancers.map((freelancer) => (
                <Grid2 item xs={12} sm={6} md={4} key={freelancer._id}>
                    <Card>
                        <CardContent>
                            <Avatar
                                src={freelancer.profilePhoto}
                                alt={freelancer.name}
                                sx={{ width: 56, height: 56, mb: 2 }}
                            />
                            <Typography variant="h6">{freelancer.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {freelancer.bio}
                            </Typography>
                            <Typography variant="subtitle2">
                                Location: {freelancer.location}
                            </Typography>
                            <Typography variant="subtitle2">
                                Hourly Rate: ${freelancer.hourlyRate}
                            </Typography>
                            <Typography variant="subtitle2">
                                Skills: {freelancer.skills.join(', ')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
};

export default FreelancerList;
