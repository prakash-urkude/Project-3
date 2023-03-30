import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const BookDetails = () => {

  const [book, setBook] = useState({});
  const id = useParams().id;

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  // get book details - book details leke setbook me daal rhe
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
    return ( 
        <v>
          <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Update A Book
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
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
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
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
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
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
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
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
          />
          {/* <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
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
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
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
          /> */}
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
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
          />
          <Button type="submit" color="primary" variant="contained">
            Update
          </Button>
        </Box>
      </form>
        </v>
     );
}
 
export default BookDetails;