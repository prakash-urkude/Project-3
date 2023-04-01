import * as React from "react";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import axios from "axios";

export default function BookCard({
  showMore,
  title,
  username,
  excerpt,
  image,
  isUser,
  time,
  id,
}) {
  console.log(id)
  let userId = localStorage.getItem("userId"), isLogin = userId ? true : false;
  const navigate = useNavigate();
  //edit
  const handleEdit = () => {
    // navigate(`/book-details/${id}`);
  };

  //delete
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (confirmed) {
      const { data } = await axios.delete(`http://localhost:3001/delete-book/${id}`);
      console.log(data)
      if (data?.status) {
        alert("Book Deleted");
        window.location.reload();
      }
    }
    } catch (error) {
      console.log(error)
    }
  }
  //showMore
  const handleShowMore = () => {
    navigate(`/show-more/${id}`)     //ye bas pathh h , iske main folder ka nam app.js me likha h

  }

  return (
    <Card
      sx={{
        width: "300px",
        height: "400px",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}>
        {/* <Box sx={{ display: "flex" }}>
    {isUser && showMore && (
      <>
        <Box>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton >
        </Box>
        <Box>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </>
    )}
  </Box>   */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title : {title}
        </Typography>
        </CardContent>
        {isUser && showMore && (
        <CardContent>
        <Typography variant="body2" color="text.secondary">
          excerpt : {excerpt}
        </Typography>
      </CardContent>
      )}
      <Box sx={{ display: "flex" }}>
        <Button onClick={handleShowMore} variant="contained" >ShowMore</Button>
        </Box> 
  </Card>
  );
}
