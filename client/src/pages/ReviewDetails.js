import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import image2 from "../images/image-2.jpg"

const ReviewDetails = () => {

  const [review, setReview] = useState({});
  const [inputs, setInputs] = useState({})
  const bookid = useParams().bookid;
  const reviewid = useParams().reviewid

  const navigate = useNavigate();
;
  // get review details - review details leke setReview me daal rhe

  const getReviewDetail = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/get-review/${reviewid}`);                        
     console.log(data)
      if (data?.status) {
        setReview(data);
        // console.log(data.book.title)
        setInputs({
          title: data?.book.title,
          excerpt: data?.book.excerpt,
          image: data?.book.image,
          ISBN: data?.book.ISBN,
          releasedAt:data?.book.releasedAt
        });
        // console.log(data)
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  useEffect(() => {
    getReviewDetail();
  }, [reviewid]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(inputs)
  };

 //update/edit  - and user jo inputs daal rha h usko yaha set krke bhej rhe, and waha se aane wala data store kr rhe variable me
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:3001/books/${bookid}/review/${reviewid}`, {
        
        review: inputs.review,
        rating: inputs.rating,
      });
      console.log(data)
      if (data?.status) {
        window.alert("Book Updated");
        navigate(`/show-more/${bookid}`);
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };
  
    return ( 
        <v>
          <form onSubmit={handleSubmit}>
          <Box
  display="flex"
  alignItems="center"
  padding={10}
//   height="100vh"
>
  <Box
  
    display="flex"
    width={500}
    flexDirection="column"
    padding={3}
    borderRadius={5}
    backgroundColor= "white"
  >
    <Typography variant="h5" fontWeight="bold" padding="2%" color="gray" sx={{ marginBottom: 2 }}>
  Review
</Typography>

    <TextField
      placeholder="review"
      value={inputs.review}
      name="review"
      margin="normal"
      type="text"
      required
      onChange={handleChange}
    />
    <TextField
      placeholder="rating - on 1 to 5"
      value={inputs.rating}
      name="rating"
      margin="normal"
      type="number"
      required
      onChange={handleChange}
    />
    <Button
      type="submit"
      sx={{ borderRadius: 3, marginTop: 3 }}
      variant="contained"
      color="primary"
    >
      Submit
    </Button>

  </Box>
  <Box
    position="absolute"
    top={0}
    left={0}
    height="100vh"
    width="100%"
    style={{ backgroundImage: `url(${image2})`, backgroundSize: "cover" }}
    zIndex={-1}
  ></Box>
</Box>

  

          </form>
        </v>
      );
}
 
export default ReviewDetails;