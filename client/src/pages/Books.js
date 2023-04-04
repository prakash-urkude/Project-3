import React, { useState, useEffect } from 'react';
import axios from "axios";
import BookCard from "../components/BookCard";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getAllBooks = async () => {
        try{
            const { data } = await axios.get("http://localhost:3001/all-book");
            if(data?.status){
                setBooks(data?.books);
                setFilterData(data?.books);
            }
        }catch(error){
            window.alert(error);
        }
    };

    useEffect(() => {
        getAllBooks();
    }, []);

    const handleSearch = async () => {
        try {
            if (searchTerm) {
                // const newData = filterData.filter((x) =>
                const newData = books.filter((x) => x.title.toLowerCase().includes(searchTerm) || x.category.toLowerCase().includes(searchTerm) || (x.userId && x.userId.toString() === searchTerm) || x.price === searchTerm);

                // );
                setBooks(newData);
            } else {
                setBooks(filterData);
            }
        } catch(error){
            window.alert(error);
        }
    };

    return (
        <div>
            <div style={{ padding: "0.5rem", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
                <input style={{ padding: "0.5rem", marginRight: "0.5rem", borderRadius: "0.25rem", border: "1px solid gray" }} type="text" placeholder="Search Books" onChange={(e) => setSearchTerm(e.target.value)} />
                <button style={{ padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none", backgroundColor: "dodgerblue", color: "white", cursor: "pointer" }} onClick={handleSearch}>Search</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(4, 1fr)", gap: "1rem" }}>
                {books.map((book) => (
                    <BookCard
                        showMore={false}
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
        </div>
    );
};

export default Books;
