import Header from "./components/Header"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Login from "./pages/Login";
import CreateBook from "./pages/CreateBook";
import BookDetails from "./pages/BookDetails";
import Userbooks from "./pages/UserBooks";
import ShowMore from "./components/ShowMore";
import ReviewDetails from "./pages/ReviewDetails";


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/show-more/:id" element= {<ShowMore/>} />
      <Route path="/register" element = {<Register/>} />
      <Route path="/" element = {<Books/>} />
      <Route path="/all-book" element = {<Books/>} />
      <Route path="/login" element = {<Login/>} />
      <Route path="/createBook" element={<CreateBook/>} />
      <Route path="/book-details/:id" element={<BookDetails/>} />
      <Route path="/my-books" element={<Userbooks/>} />
      <Route path="/book-details/:bookid/review-details/:reviewid" element={<ReviewDetails/>} />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
