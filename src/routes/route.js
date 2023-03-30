const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")
const middlewares = require("../middlewares/auth")

router.post("/register", userController.createUser);

router.post("/login", userController.login);

router.post("/books",middlewares.authentication, bookController.createBook);

router.get("/books", middlewares.authentication, bookController.getBooks);

router.get("/books/:bookId", middlewares.authentication, bookController.getBookbyParam);

router.put("/books/:bookId", middlewares.authentication, middlewares.authorisation, bookController.updateBooks);

router.delete('/books/:bookId', middlewares.authentication, middlewares.authorisation, bookController.deleteBook)

router.post("/books/:bookId/review", reviewController.creatReview);

router.put("/books/:bookId/review/:reviewId", reviewController.updatedReview);

router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReviewByParam);

router.all("/**", (req, res)=>{
    return res.status(400).send({status:false, message:"your URL is wrong plese check endpoint"})
})

module.exports = router

