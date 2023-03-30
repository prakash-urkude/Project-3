import React, { useState, useEffect } from 'react';

import axios from "axios";
import BookCard from "../components/BookCard";

const Books = () => {
    const [books,setBooks] = useState([])
      
    const getAllBooks = async () =>{
        try{
            const {data} = await axios.get("http://localhost:3001/all-book");                                         
            if(data?.status){
                setBooks(data?.books)
               
            }
        }catch(error){
            window.alert(error)
        }
    }
    useEffect(() => {
      getAllBooks()

    }, [])

    return ( 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: "1rem" }}>
            { books && 
           books.map((book) => (
            <BookCard
              showMore = {false}
              key={book._id}
              id={book._id}
              isUser={localStorage.getItem("userId") === book.userId._id}
              title={book.title}
              excerpt={book.excerpt}
              image={book.image}
              username={book.userId.name}
              time={book.releasedAt}
            />
           ))}
        </div>
     );
}
 
export default Books;