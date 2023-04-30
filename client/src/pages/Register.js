import { Button, Box, TextField, Typography , Select, MenuItem ,InputLabel, FormControl } from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image4 from '../images/image-4.jpg';
import image5 from '../images/image-5.jpg';
import image6 from '../images/image-6.jpg';
import image7 from '../images/image-7.jpg';
import image8 from '../images/image-8.jpg';

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

      // imageArray
const images = [
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

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
            window.alert("User Registered sucecdssfully")
            navigate("/login")
        }
    }
        catch(error){
           
            window.alert(error.response.data.message)
        }
    }

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

        <form onSubmit = {handleSubmit}>
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
                Register
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Title</InputLabel>
       
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
            >SUBMIT
            </Button >
            <Button 
            onClick ={() => navigate("/login")}>
            Already Registerd ? Please Login </Button>
            </Box> 
        </form>
        </div>
     );
}
 
export default Register;