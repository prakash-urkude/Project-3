const bookModel = require("../models/bookModel")
const reviewModel = require("../models/reviewModel")
const Validation = require("../validators/validator")
const { isValidObjectId } = require("mongoose")

// ----------------------------creatReview-------------------------
let creatReview = async function (req, res) {
  try {
    let bookId = req.params.bookId
    const data = req.body

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "No input provided" });
    const { reviewedBy, rating, reviewedAt } = data

    if (reviewedBy) {
      if (!Validation.isValidName(reviewedBy)) return res.status(400).send({ status: false, message: "Please provide a valid name with surname" })
    }

    if (!rating) return res.status(400).send("Please provide a reating for book")
    if (![1, 2, 3, 4, 5].includes(rating)) return res.status(400).send({ status: false, msg: "Please provide valid rating between 1 to 5" })


    if (!bookId) return res.status(400).send({ status: false, message: "Please enter BookId" })
    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "This bookid is invalid" })

    let bookCheck = await bookModel.findById(bookId)
    if (!bookCheck) return res.status(404).send({ status: false, message: "book not found" })
    if (bookCheck.isDeleted) return res.status(400).send({ status: false, message: " book already deleted" })

    if (!reviewedAt) return res.status(400).send({ status: false, message: "Please enter reviewedAt" })
    if (!Validation.IsValidDate(reviewedAt)) return res.status(400).send({ status: false, message: "please inter valid reviewedAt in format: YYYY-MM-DD" })
    data.bookId = bookId;

    console.log(data)

    let reviewBook = await reviewModel.create(data)
    let updateBook = await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: 1 } }, { new: true })

    updateBook = updateBook.toObject()
    updateBook.newReview = reviewBook


    // let str = JSON.stringify(updateBook);
    // let obj = JSON.parse(str)
    // obj.review = reviewBook

    return res.status(201).send({ status: true, Data: updateBook })

  }
  catch (error) {
    return res.status(500).send({ status: false, message: error.message })
  }
}

// ----------------------------------updatedReview-----------------------------
let updatedReview = async function (req, res) {

  try {
    let data = req.body
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId


    if (!isValidObjectId(bookId)) { return res.status(400).send({ status: false, Message: "Invalid bookId" }) }
    if (!isValidObjectId(reviewId)) { return res.status(400).send({ status: false, Message: "Invalid reviewId" }) }
    if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "All fields are menditory" }) }

    let checkBook = await bookModel.findById(bookId)
    if (!checkBook) return res.status(404).send({ status: false, message: "Book not found for this Id" })
    if (checkBook.isDeleted) return res.status(400).send({ status: false, message: "Book is deleted" })

    let checkReview = await reviewModel.findById(reviewId)
    if (!checkReview) return res.status(404).send({ status: false, message: "Review is Not found for this Id" })
    if (checkReview.isDeleted) return res.status(400).send({ status: false, message: "Review is deleted" })
    if (bookId != checkReview.bookId) return res.status(400).send({ status: false, message: "review you want to update is not belong to this book" })

    let { reviewedBy, rating } = data;

    if (!rating) return res.status(400).send({ status: false, message: "Please provide rating between 1 to 5" })
    if (![1, 2, 3, 4, 5].includes(rating)) return res.status(400).send({ status: false, msg: "Please provide valid rating between 1 to 5" })


    if (!Validation.isValidName(reviewedBy)) { return res.status(400).send({ status: false, message: "Please provide a valid name with surname" }) }

    let updateData = await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: { reviewedBy: data.reviewedBy, rating: data.rating, review: data.review, } }, { new: true })
   return res.status(200).send({ status: true, message: updateData })
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message })
  }
}


// -----------------------------------deleteReviewByParam------------------------------

const deleteReviewByParam = async function (req, res) {
  try {
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId

    if (!bookId) return res.status(400).send({ status: false, error: "bookId must be present" })
    if (!reviewId) return res.status(400).send({ status: false, error: "reviewId must be present" })


    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "Enter a valid bookId" })
    if (!isValidObjectId(reviewId)) return res.status(400).send({ status: false, msg: "Enter a valid reviewId" })

    let checkBook = await bookModel.findById(bookId)
    if (!checkBook) return res.status(404).send({ status: false, message: "Book not found for this Id" })
    if (checkBook.isDeleted) return res.status(400).send({ status: false, message: "Book is deleted" })

    let checkReview = await reviewModel.findById(reviewId)
    if (!checkReview) return res.status(404).send({ status: false, message: "Review is Not found for this Id" })
    if (checkReview.isDeleted) return res.status(400).send({ status: false, message: "Review is deleted" })

    if (bookId != checkReview.bookId) return res.status(400).send({ status: false, message: "review you want to delete is not belong to this book" })


    await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: { isDeleted: true, deletedAt: new Date() } });

    await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews: -1 } }, { new: true })

    return res.status(200).send({ status: true, message: "review deleted sucessfully" })
  }
  catch (error) {
    return res.status(500).send({ status: false, error: error.message })
  }
}

module.exports = { creatReview, updatedReview, deleteReviewByParam }








