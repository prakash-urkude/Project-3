const express = require("express")
const router = express.Router()
const {createUser, login} = require("../controllers/userController");
const { myBooks,createBook,getAllBooks,getbooksbyId, updateBookById, deleteBook} = require("../controllers/bookController");
const { createReview,deletereview,updateReview, getBookreviewbyId} = require("../controllers/reviewController");

router.post('/register', createUser);
router.post('/login', login);
router.post('/createBook', createBook)
router.get('/all-book',getAllBooks)
//GET || SIngle Book Details
router.get("/get-book/:id", getbooksbyId);
//PUT || update blog
router.put("/update-book/:id", updateBookById);
//GET || mybooks

router.get("/user-book/:id", myBooks);
//DELETE BOOK || delete
router.delete("/delete-book/:id",deleteBook)
//post || CREATE REVIEW
router.post("/books/:bookId/review",createReview)
router.get("/user-review/:id", getBookreviewbyId)
router.put("/books/:bookId/review/:reviewId", updateReview)

router.delete("/books/:bookId/review/:reviewId", deletereview)
module.exports = router