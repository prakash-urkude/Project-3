import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Box, TextField, Button, Typography, CardMedia} from "@mui/material"
import axios from "axios";
import image2 from "../images/image-2.jpg"
const Login = () => {
    const navigate = useNavigate();
    const [inputs, setInputs]= useState({
        email :"",
        password: "",
    })
    localStorage.clear()
    const handleChange=(e) =>{
        setInputs((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
}
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const {data} = await axios.post("http://localhost:3001/login",{
                email:inputs.email,
                password: inputs.password,
            });
            
            if (data.status) {
                
              
                if (data.data.token) {
                  localStorage.setItem("token", data.data.token);
                }
                if (data.data.userId._id) {
                  localStorage.setItem("userId", data.data.userId._id);
                }
                if (data.data.userId.name) {
                    localStorage.setItem("name", data.data.userId.name);
                  }
                  if (data) {
                    localStorage.setItem("isLogin", true);
                  }
                
                console.log(localStorage);
                window.alert("Successfully Login");
                navigate("/");
              }
        }catch(error){
            window.alert(error.responce.data.message);
        }
    }
    return (
        <>
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
  Login
</Typography>

    <TextField
      placeholder="email"
      value={inputs.email}
      name="email"
      margin="normal"
      type="email"
      required
      onChange={handleChange}
    />
    <TextField
      placeholder="password"
      value={inputs.password}
      name="password"
      margin="normal"
      type="password"
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
    <Button onClick={() => navigate("/register")} sx={{ borderRadius: 3, marginTop: 3 }}>
      not a user? please Register
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
        </>
      );
}
 
export default Login;