import { Button, Box, TextField, Typography , Select, MenuItem ,InputLabel, FormControl } from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Register = () => {
    const navigate = useNavigate();

    const [ inputs, setInputs] = useState({
        title:"",
        name:"",
        email:"",
        password:"",
        phone:"",
        street:"",
        city:"",
        pincode:"",
    });

    const handleChange =(e) =>{
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            
            const {data} =await axios.post("http://localhost:3001/register",{
            title: inputs.title,
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
            phone:inputs.phone,
            street: inputs.street,
            city: inputs.city,
            pincode: inputs.pincode,
        })
        if(data.status){
            window.alert("User Registered sucessfully")
            navigate("/login")
        }
    }
        catch(error){
           
            window.alert(error.response.data.message )
        }
    }
    return ( 
        <>
        <form onSubmit = {handleSubmit}>
           <Box 
           maxWidth={450}
           display="flex"
           flexDirection={"column"}
           alignItems="center"
           justifyContent={"center"}
           margin="auto"
           marginTop={5}
           boxShadow="10px 10px 20px #ccc"
           padding={3}
           borderRadius={5}
           >
            <Typography>
                Register
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Title</InputLabel>
       {/* {console.log(inputs)}  */}
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={inputs.title}
          onChange={handleChange}
          autoWidth
          label="Title"
          name="title"
          required
          sx={{ width: '100%' }}
        >
          <MenuItem value="">
          <em>None</em>
          </MenuItem>
<MenuItem value="Mr">Mr</MenuItem>
<MenuItem value="Mrs">Mrs</MenuItem>
<MenuItem value="Miss">Miss</MenuItem>
        </Select>
      </FormControl>
            
            <TextField
                placeholder = "username"
                value={inputs.name}
                onChange={handleChange}
                name = "name"
                margin = "normal"
                type = {"text"}
                required
                
            />
            <TextField
                placeholder = "email"
                value={inputs.email}
                name = "email"
                margin = "normal"
                type = {"email"}
                required
                onChange={handleChange}
            />
            <TextField
                placeholder = "password"
                value={inputs.password}
                name = "password"
                margin = "normal"
                type = {"password"}
                required
                onChange={handleChange}
            />
            <TextField
    placeholder="phone number"
    value={inputs.phone}
    name="phone"
    margin="normal"
    type="text"
    required
    onChange={handleChange}
/>
            <TextField
                placeholder = "street"
                value={inputs.street}
                name = "street"
                margin = "normal"
                type = {"text"}
                required
                onChange={handleChange}
            />
            <TextField
                placeholder = "city"
                value={inputs.city}
                name = "city"
                margin = "normal"
                type = {"text"}
                required
                onChange={handleChange}
            />
            <TextField
                placeholder = "pincode"
                value={inputs.pincode}
                name = "pincode"
                margin = "normal"
                type = {"pincode"}
                required
                onChange={handleChange}
            />
            <Button 
            type = "submit"
            sx ={{borderRadius:3, marginTop:3}}
            varient = "contained"
            color = "primary"
            >submit
            </Button >
            <Button 
            onClick ={() => navigate("/login")}>
            Already Registerd ? Please Login </Button>
            </Box> 
        </form>
        </>
     );
}
 
export default Register;