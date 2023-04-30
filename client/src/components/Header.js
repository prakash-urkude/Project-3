import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

// const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact'];


function Header() {
  //globally
  let userId = localStorage.getItem("userId"), isLogin = userId ? true : false;

    const navigate = useNavigate()
    //state of value
    const [value, setValue] = useState(0)
    let name = localStorage.getItem("name")
    console.log(name)
    //logout
    const handleLogout = () => {
      const confirmed = window.confirm("Are you sure you want to log out?");
      console.log(confirmed)
      if (confirmed) {
        localStorage.clear()
        window.alert("logout successfully")
      
        navigate("/");
      }
      let name = localStorage.getItem("name")
      console.log(name)
    }; 
    return (
        <>
        <AppBar position="sticky" style={{ backgroundColor: '#f50057' }}>
            <Toolbar>
              <Typography variant="h3" >𝓛𝒾𝕍𝓔Ɫ𝕪 β∞𝕂s</Typography>
                {isLogin && (
                  
                
                  <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
                  <Tabs
                  textColor ="inherit"
                  value ={value}
                  onChange={(e,val) => setValue(val)}
                  >
                  <Tab label="About" LinkComponent={Link} to="/AboutUs" />                     
                  <Tab label="Books" LinkComponent={Link} to="/" /> 
                  <Tab label=" My Books" LinkComponent={Link} to="/my-books" />
                  <Tab label=" Create Books " LinkComponent={Link} to="/createBook" />
                  </Tabs>
                </Box>
                )}
                <Box display={"flex"} marginLeft="auto">
                  {!isLogin && (
                 <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/"
                  > Home
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/AboutUs"
                  > AboutUs
                </Button>

                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                  > Login
                </Button>

                <Button 
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent ={Link}
                  to = "/register"
                  >Register
                  </Button>
                  </>
                  )}
                 {isLogin && (
  <React.Fragment>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
         {name}
        </Avatar>
      }
    />
    <Button
      sx={{ margin: 1, color: "white" }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  </React.Fragment>
)}

                </Box>
            </Toolbar>
          </AppBar>
        </>
      );
 }
export default Header;
