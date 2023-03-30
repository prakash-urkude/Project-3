// const UserBooks = () => {
//   return ( "my all books" );
// }
 
// export default UserBooks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";

  //get user books
const Userbooks = () => {

    const [books, setbooks] = useState([]);
    const [name, setName] = useState("");
  
    const getUserbooks = async () => {
      try {
        const id = localStorage.getItem("userId");
        const { data } = await axios.get(`http://localhost:3001/user-book/${id}`);
        
        if (data?.status) {
          setbooks(data?.userBooks.books);
          setName(data?.name);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getUserbooks();
    }, []);
  
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: "1rem" }}>
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              id={book._id}
              isUser={true}
              title={book.title}
              excerpt={book.excerpt}
              image={book.image}
              username={name}
              time={book.updatedAt}
            />
          ))
        ) : (
          <h1>You Haven't Created a Book</h1>
        )}
      </div>
    );
  };

export default Userbooks;