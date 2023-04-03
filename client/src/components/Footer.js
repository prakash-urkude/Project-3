import React from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import { useNavigate } from "react-router-dom";


const Footer = () => {
    let navigate = useNavigate()
  return (
    <>
    <BottomNavigationAction style={{flex: 1}} label="About Us" icon={<RestoreIcon />} />
    <div style={{flex: 1, textAlign: "center", fontWeight: "bold"}} onClick={navigate ="/AboutUs"}>
      About Us
    </div>
    <BottomNavigationAction style={{flex: 1}} label="Favorites" icon={<RestoreIcon />} />
    </>
  );
}
 
export default Footer;
