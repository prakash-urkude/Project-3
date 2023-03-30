import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    //logout
    const handleLogout = () => {
      const confirmed = window.confirm("Are you sure you want to log out?");
      console.log(confirmed)
      if (confirmed) {
        localStorage.setItem("token", "");
        localStorage.setItem("userId", "");
        window.alert("logout successfully")
      
        navigate("/");
      }
    };
    return (
        <>
        <AppBar position="sticky" style={{ backgroundColor: '#f50057' }}>
            <Toolbar>
              <Typography variant="h3" >ρΛᗪ𐋏Λ𝔦 - 𝕃𝕀𝕂ℍ𝔸𝕀</Typography>
                {isLogin && (
                  <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
                  <Tabs
                  textColor ="inherit"
                  value ={value}
                  onChange={(e,val) => setValue(val)}
                  >
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
                  to="/login"
                    > Login</Button>
                    <Button sx={{ margin: 1, color: "white" }}
                    LinkComponent ={Link}
                    to = "/register"
                    >Register</Button>
                  </>
                  )}
                  {isLogin && (
                    <Button sx={{ margin: 1, color: "white" }}
                    onClick ={handleLogout}
                  >
                    Logout
                    </Button>
                    )}
                </Box>
            </Toolbar>
          </AppBar>
        </>
      );
 }
export default Header;
