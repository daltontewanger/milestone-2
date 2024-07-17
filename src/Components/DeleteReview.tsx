import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { Grid, Paper, Avatar, Button, Typography } from '@mui/material';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import Loading from './Loading.tsx';

interface Review {
    rating: number;
    review: string;
}

const DeleteReview = () => {
    const navigate = useNavigate();
    const { imdbID, reviewID } = useParams<{ imdbID: string; reviewID: string }>();
    const [currentRating, setCurrentRating] = useState<number>(0);
    const [review, setReview] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const response = await fetch(`https://ms-2-project-backend.onrender.com/reviews/${imdbID}/${reviewID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch review');
                }
                const result: Review = await response.json();
                setCurrentRating(result.rating);
                setReview(result.review);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching review:', error);
                setLoading(false);
            }
        };

        fetchReviewData();
    }, [imdbID, reviewID]);

    const handleDelete = async (event: FormEvent) => {
        event.preventDefault();
        const url = `https://ms-2-project-backend.onrender.com/reviews/${reviewID}`;
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete review');
            }
            console.log("Review deleted successfully");
            // Navigate back to the movie component
            navigate(`/movie/${imdbID}`);
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const handleCancel = () => {
        navigate(`/movie/${imdbID}`);
    };

    const avatarStyle = { backgroundColor: '#1976d2' };

    if (loading) {
        return <Loading />;
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={10} md={8} lg={6}>
                    <Paper
                        style={{
                            padding: 20,
                            height: "auto",
                            maxWidth: '600px',
                            margin: '30px auto',
                            marginBottom: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            wordBreak: "break-word",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <Grid container sx={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Avatar style={avatarStyle}>
                                <RateReviewRoundedIcon />
                            </Avatar>
                            <Typography variant="h5">Delete Review</Typography>
                            <Typography variant="h6">Rating: {currentRating} ⭐</Typography>
                            <Typography variant="body1">{review}</Typography>
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                                onSubmit={handleDelete}
                                sx={{
                                    '& .MuiTextField-root': { m: 1 },
                                    width: '100%',
                                    mt: 2
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Button type="button" onClick={handleCancel} sx={{ backgroundColor: 'green', color: 'white', px: 3, margin: '10' }} variant="contained">Go Back</Button>
                                    <Button type="submit" onClick={handleDelete} sx={{ backgroundColor: 'darkred', color: 'white', px: 3, margin: '10' }} variant="contained">Delete</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default DeleteReview;