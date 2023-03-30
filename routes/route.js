const express = require("express")
const router = express.Router()
const {createUser, login} = require("../controllers/userController");
const { myBooks,createBook,getAllBooks,getbooksbyId, updateBookById, deleteBook} = require("../controllers/bookController");


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
router.get("delete-book/:id",deleteBook)
module.exports = router