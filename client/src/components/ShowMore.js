import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import "slick-carousel/slick/slick.css";
import ReviewCard from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";

const ShowMore = () => {
  const { id } = useParams(); //bookid
  // console.log(id)
  const [bookData, setBookData] = useState({});
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isUser, setIsUser] = useState(false);
  const name = localStorage.getItem("name");

//  console.log(localStorage)
  var userId = localStorage.getItem("userId"), isLogin = userId ? true : false;

  // var isUser = false
   const navigate = useNavigate();

  //edit book
  const handleEditBook = () => {
    navigate(`/book-details/${id}`);
  };
  

  //delete book
  const handleDeleteBook = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
      const { data } = await axios.delete(`http://localhost:3001/delete-book/${id}`);
      console.log(data)
      if (data?.status) {
        alert("Book Deleted");
        window.location.reload();
      }
    }
    } catch (error) {
      console.log(error)
    }
  }



  // get bookData
  async function getBookDetail() {
    try {
      const response = await axios.get(`http://localhost:3001/get-book/${id}`);
      if (response && response.data) {
        // console.log(response)
        const isUser = userId === response.data.book.userId?true:false
       await setBookData(response.data);
       await setIsUser(isUser);
        
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }

  useEffect(() => {
    getBookDetail();
  }, [id]);
  

// console.log(bookData.book.bookUrl) 

//DOWNLOAD
const handleDownload = async(e) =>{
  e.preventDefault();
  try{
    if(isUser){
      console.log(isUser)
     const confirmed = window.confirm("Are you sure you want to download?");
    if (confirmed) {
window.open(bookData.book.bookUrl);
  }}else{
    navigate("/login")
  }
}catch(error){
    window.alert(error.responce.data.message)
  }

}


//create reviewCard
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(localStorage.length ==0){
      localStorage.setItem("isLogin","false")
      if(localStorage.getItem("isLogin") == "false"){
      let name = "Guest"
      localStorage.setItem("reviewid",id)
      console.log("98")
      const { data } = await axios.post(`http://localhost:3001/books/${id}/review`, {

        review:review,
        rating:rating,
        reviewedBy: name
      });
      console.log(data)
      setReview("")
      setRating(0)

      if (data) {
        window.alert("Review added.");
      }}
    }else{
      
        const { data } = await axios.post(`http://localhost:3001/books/${id}/review`, {

        review:review,
        rating:rating,
        reviewedBy: name,
        userId: userId,
        userid: userId
      });
      // console.log(data)
      setReview("")
      setRating(0)

      if (data) {
        window.alert("Review added.");
        navigate(`/show-more/${id}`);
      }
      }
      
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  // console.log(localStorage)
// console.log(bookData)

  return (
    <div style={{ position: 'relative', width: '45%', height: '600px' }}>
      {bookData && (
        <CardActionArea style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          {bookData.book && (
          <CardMedia
            component='img'
            height='100%'
            image={bookData.book.image}
            style={{ position: 'absolute', top: '5%', left: '5%' }}
          />
          )}
          <CardContent
            style={{
              position: 'absolute',
              top: '5%',
              left: '110%',
              width: '100%',
              border: '5px solid #ccc',
              borderRadius: '5px',
              padding: '20px'
            }}
          >
            {bookData.book && (
             <Box sx={{ display: "flex", alignItems: "center" }}>
             <Typography gutterBottom variant='h5' component='div' sx={{ marginRight: "auto" }}>
              {bookData.book.title}
            </Typography>
            
            {isUser &&(
      <>
        <Box display={"flex"}>
          <IconButton onClick={handleEditBook} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton >
        
          <IconButton onClick={handleDeleteBook}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </>
    )}
            </Box>
            )}
                <br/>
        <Box  sx={{ display: "flex" }}>
        <Button style={{ margin: '5px' }} component='div' gutterBottom variant="contained" color="success" 
         onClick={handleDownload}>
        DOWNLOAD
</Button>
          <br/>
        </Box >
            {bookData.book && (
            <Typography variant='body2' color='text.secondary'style={{ margin: '5px' }}>
              {bookData.book.excerpt}
            </Typography>
            )}
            <br />
            <Typography gutterBottom variant='h6' component='div'>
              Rate this book:
            </Typography>
            <Rating
              name='rating'
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <br />
            <form onSubmit={handleSubmit}>
              <div>
                <Typography gutterBottom variant='h8' component='div'>
                  Write a review:
                </Typography>
                <br />
                <textarea
                  id='review'
                  name='review'
                  value={review}
                  onChange={(e) => setReview(e.target.value)}          //handle review
                  rows={4}
                  cols={50}
                  style={{ width: '100%', maxHeight: '200px', resize: 'none' }} 
                ></textarea>
              </div>
              <br />
              <Box sx={{ display: "flex" }}>
        <Button onClick={handleSubmit} variant="contained" >Submit</Button>
        
        </Box> 
          </form>

          <Box style={{ margin: "1rem 0" }}>
              <Slider infinite={true} slidesToShow={1} slidesToScroll={1} >
               {bookData.book &&
                  bookData.book.reviewData.map((review) => (
                    <div style={{ margin: "8 8rem" }}>
                     <ReviewCard
            bookid = {id}         
            name={review.reviewedBy}
            reviewid={review._id}
            userid = {review.userid}
            isUser={localStorage.getItem("userId") === review.userid }
            rating={review.rating}
            review={review.review}
          />
        </div>
      ))}

  </Slider>
</Box>

        </CardContent>
      </CardActionArea>
       )}
    </div>
  );
};

export default ShowMore;

