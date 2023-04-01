import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from '../images/image-4.jpg';
import image5 from '../images/image-5.jpg';
import image6 from '../images/image-6.jpg';
import image7 from '../images/image-7.jpg';
import image8 from '../images/image-8.jpg';
const BookDetails = () => {

  const [book, setBook] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // get book details - book details leke setbook me daal rhe
  console.log(inputs)

  const images = [
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  const getBookDetail = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/get-book/${id}`);                        
     console.log(data)
      if (data?.status) {
        setBook(data);
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
    getBookDetail();
  }, [id]);

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
      const { data } = await axios.put(`http://localhost:3001/update-book/${id}`, {
        title: inputs.title,
        excerpt: inputs.excerpt,
        image: inputs.image,
        ISBN : inputs.ISBN,
        userId: localStorage.getItem("userId"),
      });
      console.log(data)
      if (data?.status) {
        window.alert("Book Updated");
        navigate("/my-books");
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  console.log(inputs)
    return ( 
      
        // <div className="slider-container">
          <div style={{ position: 'absolute', width: '45%', height: '300px' }}>
          <Box 
             style={{
              position: 'absolute',
              top: '5%',
              right: '-40%',
              width: '150%',
              border: '1px solid #ccc',
              flexDirection: 'row',
              height: '180%',
              maxWidth: '135%',
              objectFit: 'cover',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
               
          >
           <Slider {...settings}>
            {images.map((image) => (
              <div key={image}>
                <img src={image} alt="Image 1" />
              </div>
            ))}
          </Slider>
          </Box>
    
          <form onSubmit={handleSubmit}>
            <Box
               style={{
                position: 'absolute',
                top: '5%',
                left: '160%',
                width: '50%',
                border: '5px solid #ccc',
                borderRadius: '5px',
                padding: '2%',
                flexDirection: "column",
                maxHeight: '500px',
                overflow: 'auto'
              }}
            >
              <Typography
                variant="h5"
                textAlign={"center"}
                fontWeight="bold"
                padding="2%"
                color="gray"
              >
                Update A Book
              </Typography>
              <InputLabel
                sx={{ mb: 1, mt: 2, fontSize: "100%", fontWeight: "bold" }}
              >
                Title
              </InputLabel>
              <TextField
                name="title"
                value={inputs.title}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ width: "80%" }}
              />
              <InputLabel
                sx={{ mb: 1, mt: 2, fontSize: "100%", fontWeight: "bold" }}
              >
                Excerpt
              </InputLabel>
              <TextField
                name="description"
                value={inputs.description}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ width: '80%' }}
              />
              <InputLabel
                sx={{ mb: 1, mt: 2, fontSize: "100%", fontWeight: "bold" }}
              >
                Image URL
              </InputLabel>
              <TextField
                name="image"
                value={inputs.image}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ width: '80%' }}
              />
              <InputLabel
                sx={{ mb: 1, mt: 2, fontSize: "100%", fontWeight: "bold" }}
              >
                ISBN
              </InputLabel>
              <TextField
            name="ISBN"
            value={inputs.ISBN}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ width: '80%' }}
          />
              <InputLabel
                sx={{ mb: 1, mt: 2, fontSize: "100%", fontWeight: "bold" }}
              >
                Released Date
              </InputLabel>
              <TextField
                name="releasedAt"
                value={inputs.releasedAt}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{ width: '80%' }}
              />
               <Box mt={2} alignSelf="flex-end">
              <Button type="submit" color="primary" variant="contained" >
                UPDATE
              </Button>
              </Box>
            </Box>
          </form>
     </div>
    
     );
}
 
export default BookDetails;