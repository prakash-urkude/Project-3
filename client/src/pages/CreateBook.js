
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import image5 from '../images/image-5.jpg';
// import image6 from '../images/image-2.jpg';
// import image3 from '../images/image-3.jpg';
// import image4 from '../images/image-4.jpg';

// const images = [
//   5mage5,
//   image6,
//   image3,
//   image4,
// ];

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   cssEase: "linear"
// };

// function App() {
//   return (
//     <div className="App">
//       <Slider {...settings}>
//         {images.map((image) => (
//           <div key={image}>
//             <img src={image} alt="Image 1" />
//           </div>
//         ))}
//       </Slider>
//       <div className="content">
//         <h1>Welcome to my website</h1>
//         <p>This is some content that appears on top of the background image slider.</p>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from '../images/image-4.jpg';
import image5 from '../images/image-5.jpg';
import image6 from '../images/image-6.jpg';
import image7 from '../images/image-7.jpg';
import image8 from '../images/image-8.jpg';

import  "../App.css"

// import images from 
const CreateBook = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    excerpt: "",
    image: "",
    userId: "",
    ISBN: "",
    category: "",
    subcategory: "",
    releasedAt: ""
  });
  // imageArray
const images = [
  image4,
  image5,
  image6,
  image7,
  image8,
];
  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/createBook", {
        title: inputs.title,
        excerpt: inputs.excerpt,
        image: inputs.image,
        userId: id,
        ISBN: inputs.ISBN,
        category: inputs.category,
        subcategory: inputs.subcategory,
        releasedAt: inputs.releasedAt
      });
      console.log(data);
      if (data?.status) {
        window.alert("Book Created");
        navigate("/");
      }
    } catch (error) {
      window.alert(error);
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
            Create A Book
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
            sx={{ mb: 1, mt: 1, fontSize: "100%", fontWeight: "bold" }}
          >
            category
          </InputLabel>
          <TextField
            name="category"
            value={inputs.category}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            sx={{ width: '80%' }}
          />
          <InputLabel
            sx={{ mb: 1, mt: 2,fontSize: "100%", fontWeight: "bold" }}
          >
            subcategory
          </InputLabel>
          <TextField
            name="subcategory"
            value={inputs.subcategory}
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
            SUBMIT
          </Button>
          </Box>
        </Box>
      </form>
 </div>

  );
};

export default CreateBook;


