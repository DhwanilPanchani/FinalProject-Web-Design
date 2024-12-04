import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import apiClient from '../api/apiClient';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        hourlyRate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/jobs', formData);
            alert('Job posted successfully!');
            setFormData({ title: '', description: '', location: '', hourlyRate: '' });
        } catch (error) {
            console.error('Error posting job:', error);
            alert('Error posting job.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
            <TextField
                label="Job Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
            />
            <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
            />
            <TextField
                label="Hourly Rate"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                type="number"
                required
            />
            <Button variant="contained" color="primary" type="submit">
                Post Job
            </Button>
        </Box>
    );
};

export default PostJob;
