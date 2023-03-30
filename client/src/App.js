import Header from "./components/Header"
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Login from "./pages/Login";
import CreateBook from "./pages/CreateBook";
// import BookDetails from "./pages/BookDetails";
import Userbooks from "./pages/UserBooks";


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/register" element = {<Register/>} />
      <Route path="/" element = {<Books/>} />
      <Route path="/all-book" element = {<Books/>} />
      <Route path="/login" element = {<Login/>} />
      <Route path="/createBook" element={<CreateBook/>} />
      {/* <Route path="/blog-details/:id" element={<BookDetails/>} /> */}
      <Route path="/my-books" element={<Userbooks/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
