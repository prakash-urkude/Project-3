import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Box, TextField, Button, Typography} from "@mui/material"
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const [inputs, setInputs]= useState({
        email :"",
        password: "",
    })
    const handleChange=(e) =>{
        setInputs((prevState)=>({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
}
    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const {data} = await axios.post("/login",{
                email:inputs.email,
                password: inputs.password,
            });
            if (data.status) {
                console.log(data.data.token);
              
                if (data.data.token) {
                  localStorage.setItem("token", data.data.token);
                }
                if (data.data.userId) {
                  localStorage.setItem("userId", data.data.userId);
                }
                // console.log(localStorage);
                window.alert("Successfully Login");
                navigate("/");
              }
        }catch(error){
            window.alert(error);
        }
    }
    return ( 
        <>
        <form onSubmit={handleSubmit}>
            <Box 
            maxWidth = {450}
            display = "flex"
            flexDirection={"column"}
            alignItems = "center"
            justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
            >
                <Typography>
                login
                </Typography>
                <TextField
                placeholder="email"
                value={inputs.email}
                name = "email"
                margin="normal"
                type={"email"}
                required
                onChange={handleChange}
                />
                <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />
                <Button 
                type ="submit"
                sx={{ borderRadius:3, marginTop:3}}
                variant="contained"
                color ="primary">
                    Submit
                </Button>
                <Button 
                onclick ={()=>navigate("/register")}
                sx={{ borderRadius:3, marginTop:3}}>
                    not a user ? please Register
                </Button>
            </Box>
        </form>
        </>
     );
}
 
export default Login;