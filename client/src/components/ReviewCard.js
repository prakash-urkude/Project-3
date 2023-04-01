import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ReviewCard({

  isUser,
    bookid,
    name,
    rating,
    review,
    reviewid,
}) {
  console.log(bookid)
  console.log(reviewid)
  console.log(isUser)
//  //localStorage.clear();

  // console.log(localStorage)
  const navigate = useNavigate();
  
    //edit review
    const handleEditReview = () => {
      console.log(reviewid)
      navigate(`/book-details/${bookid}/review-details/${reviewid}`);
    };

     //delete review
  const handleDeleteReview = async () => {
    try {
      console.log(reviewid)
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
      const { data } = await axios.delete(`http://localhost:3001/books/${bookid}/review/${reviewid}`);
      console.log(data)
      if (data?.status) {
        alert("Review Deleted");
        window.location.reload();
      }
    }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card sx={{ width: '100%', backgroundColor: '#f1ee8e' }}>
      <CardContent>
      <Box sx={{ display: "flex" }}>
      {
      isUser &&
      (
      <>
      <Box display={"flex"}>
          <IconButton onClick={handleEditReview} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton >
        
          <IconButton onClick={handleDeleteReview}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </>
    )}
  </Box>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Rating 
          value={rating}
          readOnly
          sx={{ color: 'gold' }}
          name="read-only" />
           <Typography variant="body2" color="text.secondary">
          {review}
        </Typography>
      </CardContent>
    </Card>
  );
}



