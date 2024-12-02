// import React, { useState, useEffect } from 'react';
// import apiClient from '../api/apiClient';
// import { Container, Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

// const Dashboard = () => {
//     const [jobs, setJobs] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');

//     useEffect(() => {
//         const fetchJobs = async () => {
//             try {
//                 const response = await apiClient.get('/jobs');
//                 setJobs(response.data.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };
//         fetchJobs();
//     }, []);

//     const filteredJobs = jobs.filter((job) =>
//         job.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <Container
//             maxWidth="lg"
//             sx={{
//                 paddingTop: '80px', // Add padding to account for navbar height
//             }}
//         >
//             <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
//                 Explore Opportunities
//             </Typography>
//             <Box sx={{ mb: 3 }}>
//                 <TextField
//                     label="Search Jobs"
//                     fullWidth
//                     variant="outlined"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//             </Box>
//             <Grid container spacing={4}>
//                 {filteredJobs.map((job) => (
//                     <Grid item xs={12} sm={6} md={4} key={job._id}>
//                         <Card sx={{ height: '100%' }}>
//                             <CardContent>
//                                 <Typography variant="h6" gutterBottom>
//                                     {job.title}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     {job.description}
//                                 </Typography>
//                                 <Typography variant="subtitle2" sx={{ mt: 1 }}>
//                                     Location: {job.location}
//                                 </Typography>
//                                 <Typography variant="subtitle2">
//                                     Hourly Rate: ${job.hourlyRate}
//                                 </Typography>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     fullWidth
//                                     sx={{ mt: 2 }}
//                                 >
//                                     Apply Now
//                                 </Button>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// };

// export default Dashboard;






import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Box } from '@mui/material';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box
            sx={{
                backgroundColor: '#E3F2FD', // Light blue color
                minHeight: '100vh', // Ensure it covers the entire viewport
                paddingTop: '80px', // Adjust for the navbar height
                transition: 'background-color 0.5s ease', // Smooth color transition
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#0D47A1' }}>
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
                                    >
                                        Apply Now
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