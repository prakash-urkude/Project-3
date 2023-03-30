const bookModel = require('../models/bookModel');
const userModel = require('../models/userModel');
const reviewModel= require('../models/reviewModel')
const { checkInputsPresent, checkString, validateName, validateTName, validateISBN, validateDate } = require('../validators/validators');

const ObjectId = require('mongoose').Types.ObjectId
const{ isValidObjectId }=require("mongoose")


// ==============================create books======================a=====================

// const createBook = async function(req, res){
//   try {
//       let data = req.body
//       let { title, excerpt, userId, ISBN, category, subcategory, releasedAt, image } = data

//       let checkUserId = await userModel.findById(userId)
//       if (!checkUserId) {
//           return res.status(404).send({ status: false, message: `User with ID ${userId} not found.` })
//       }

//       let createBook = await bookModel.create(data)
//       if (!createBook) {
//           return res.status(500).send({ status: false, message: `Error creating book.` })
//       }

//       let userAdd = await userModel.findOneAndUpdate({ _id: userId }, { $push: { books: createBook._id } }, { new: true })
//       if (!userAdd) {
//           return res.status(500).send({ status: false, message: `Error updating user.` })
//       }
// console.log(userAdd)
//       res.status(201).send({ status: true, message: `This ${title} Book is created sucessfully.`, data: createBook })
//   } catch (err) {
//       console.error(err)
//       res.status(500).send({ status: false, message: `Server error: ${err.message}` })
//   }
// }

const createBook = async function(req, res){
    try {
        let data = req.body
        let { title, excerpt, userId, ISBN, category, subcategory,releasedAt,image} = data
        // console.log(data)

        if(!image) return res.status(400).send({status:false, message:"please provide image"})
        if (!checkInputsPresent(data)) return res.status(400).send({ status: false, message: "No data found from body!" })

        if (!checkString(userId)) { return res.status(400).send({ status: false, message: "Please Insert userId." }) }
        if (!ObjectId.isValid(userId)) { return res.status(400).send({ status: false, message: `This UserId: ${userId} is not Valid.` }) }
        
        let checkUserId = await userModel.findById(userId)
        if (!checkUserId) { return res.status(400).send({ status: false, message: `${userId} is not Exist.` }) }

        if (!checkString(title)) return res.status(400).send({ status: false, message: "Please Provide Title of Book." })
        if (!validateTName(title)) return res.status(400).send({ status: false, message: "Invalid Title." });  
        if (!checkString(excerpt)) return res.status(400).send({ status: false, message: "Please Provide Book Excerpt." })
        // if (!validateName(excerpt)) return res.status(400).send({ status: false, message: "Invalid Excerpt." });

        if (!checkString(ISBN)) return res.status(400).send({ status: false, message: "Please Provide Book ISBN." })
        if (!validateISBN(ISBN)) return res.status(400).send({ status: false, message: "Invalid ISBN." });

        if (!checkString(category)) return res.status(400).send({ status: false, message: "Please Provide Book Category." })
        if (!validateName(category)) return res.status(400).send({ status: false, message: "Invalid Category." });

        if (!checkString(subcategory)) return res.status(400).send({ status: false, message: "Please Provide Book Subcategory." })
        if (!validateName(subcategory)) return res.status(400).send({ status: false, message: "Invalid Subcategory." });

        if (!checkString(releasedAt)) return res.status(400).send({ status: false, message: "Please Provide Book releasedAt Date." });
        if (!validateDate(releasedAt)) return res.status(400).send({ status: false, message: "Invalid Date Format. You should use this format (YYYY-MM-DD)" });

        let checkDuplicateTitle = await bookModel.findOne({ title: title })
        if (checkDuplicateTitle) {
            return res.status(400).send({ status: false, message: `This Book: ${title} is already exist. Please provide another Title.` })
        }

        let checkDuplicateISBN = await bookModel.findOne({ ISBN: ISBN })
        if (checkDuplicateISBN) {
            return res.status(400).send({ status: false, message: `This ISBN: ${ISBN} is already exist. Please provide another ISBN.` })
        }

        let createBook = await bookModel.create(data)
        let userAdd = await userModel.findOneAndUpdate({_id: userId},{ $push:{books:createBook._id}},{new:true})

        res.status(201).send({ status: true, message: `This ${title} Book is created sucessfully.`, data: createBook })

    } catch (error) {

        res.status(500).send({ status: 'error', error: error.message })
    }

}


// =============================get books================================================

const getbooks= async function(req,res){
    try{
        let data=req.query
        let filterbook={isDeleted:false,...data}
        if(!Object.keys(data).length){
            let books = await bookModel.find({isDeleted:false}).sort({title:1})
            if(books.length==0){
                return res.status(404).send({status:false, message:"No book exist"})
            }
            return res.status(200).send({status:true, message:"Book List", data:books})
        }else{
            if(data.userId||data.category||data.subcategory){
                if(data.userId){
                if(!isValidObjectId(data.userId)) return res.status(400).send({status:false,message:"Please provide valid userId"})
                }
                let books= await bookModel.find(filterbook).select({_id:1,title:1,excerpt:1,userId:1,category:1,reviews:1,releasedAt:1}).sort({title:1})
                if(books.length==0){
                    return res.status(404).send({status:false,message:"No such book exist or Already Deleted"})
                }
                return res.status(200).send({status:true, message:"Book List",data:books})
        }
        return res.status(400).send({status:false,message:"Please Provide valid Query"})
    }
    }catch(error){
        return res.status(500).send({status:false, message:error.message})
    }
    }

    
//==================================get book by Id============================================= 
    
const getbooksbyId= async function(req,res){
try{
    let bookId=req.params.id
    // if(!isValidObjectId(bookId)) return res.status(400).send({status:false,message:"Please provide valid bookId"})
    
    const findId=await bookModel.findById({_id:bookId})
    if(!findId) return res.status(404).send({status:false,message:"No book exist with this Id"})
    if(findId.isDeleted) return res.status(404).send({status:false,message:"The book you are trying to find is deleted"})
  
    const review= await reviewModel.find({bookId:findId._id, isDeleted:false}).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
    const details={
        _id:findId._id,
        title:findId.title,
        excerpt:findId.excerpt,
        userId:findId.userId,
        category:findId.category,
        subcategory:findId.subcategory,
        reviews:findId.reviews,
        isDeleted:findId.isDeleted,
        releasedAt:findId.releasedAt,
        createdAt:findId.createdAt,
        updatedAt:findId.updatedAt,
        reviewData:review,
        image:findId.image
    }
    
    return res.status(200).send({status:true,message:"book List", book: details})
}catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

// =============================PUT /books/:bookId=====================================================

const updateBookById = async (req, res) => {
    try {
        let bookId = req.params.id;
        let body = req.body
        let { title, excerpt, ISBN, releasedAt, image, ...rest } = body   
        console.log(body)   
       
        if (!checkInputsPresent(body)) return res.status(400).send({ status: false, message: "please provide some details(i.e. title, excerpt, releasedAt, ISBN) to update !!!" });
        if (checkInputsPresent(req.query)) { return res.status(400).send({ status: false, message: "You can't put anything in Query" }) }
        // if (checkInputsPresent(rest)) { return res.status(400).send({ status: false, message: "You can put only title or excerpt or releasedAt or ISBN." }) }
        
        if (body.hasOwnProperty('title') && !checkString(title)) return res.status(400).send({ status: false, message: "Please Provide Title." })
        if (title && !validateTName(title)) return res.status(400).send({ status: false, message: "Invalid Title." });
        
        if (body.hasOwnProperty('excerpt') && !checkString(excerpt)) return res.status(400).send({ status: false, message: "Please Provide Excerpt." })
        // if (excerpt) return res.status(400).send({ status: false, message: "Invalid Excerpt." });        
      
        if (body.hasOwnProperty('ISBN') && !checkString(ISBN)) return res.status(400).send({ status: false, message: "Please Provide ISBN." })
        if (ISBN && !validateISBN(ISBN)) return res.status(400).send({ status: false, message: "Invalid ISBN." });
        
        
        // if (body.hasOwnProperty('releasedAt') && !validateDate(releasedAt)) return res.status(400).send({ status: false, message: "Invalid Date Format. You should use this format (YYYY-MM-DD)" });
        
        // let book = await bookModel.findOne({ _id: "641fcdaecbb8eaf9b7c7387a" })
        // console.log(book)
        let uniqueTitle = await bookModel.findOne({ title: title, _id: { $ne: [bookId] } }) //is book id ko hta ke kisi or ka title ye h kya
        if (uniqueTitle) { return res.status(404).send({ status: false, message: `This Title: ${title} is already Present. Please use Another Title.` }) }
        
  
        let uniqueISBN = await bookModel.findOne({ ISBN: ISBN,_id: { $ne: [bookId] } })
        // console.log(uniqueISBN)
        if (uniqueISBN) { return res.status(404).send({ status: false, message: `This ISBN: ${ISBN} is already Present. Please use Another ISBN.` }) }
                
        let updateBook = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, body, { new: true,  upsert: true})

        if (!updateBook) { return res.status(404).send({ status: false, message: "No Document Found! Book Updation Unsuccessful" }) }
        // console.log(updateBook)
        return res.status(200).send({ status: true, message: 'Success', data: updateBook })

    } catch (error) {
        
      return  res.status(500).send({ status: 'error', error: error.message })
    }
}

// // ===============================DELETE /books/:bookId===============================================
    
let deleteBook = async function (req, res) {
    try {
        const bookId = req.params.id
      // console.log(bookId)
        if(!isValidObjectId(bookId)) return res.status(400).send({status:false,message:"Please provide valid bookId"})
       let deletedBook = await bookModel.findOneAndDelete({ _id: bookId},
            { isDeleted: false }, { new: true }).populate("userId")
            // console.log(deletedBook)
           let v1 =  await deletedBook.userId.books.push(deletedBook);
          //  console.log(v1)
            let v2 = await deletedBook.userId.save();
            // console.log(v2)
        if (!deletedBook) {
            return  res.status(404).send({ status: false, message: "either the book is already deleted" })
            
        }
        return res.status(200).send({ status: true, message: "Book has been deleted" ,data:deleteBook})
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
};

//GET USER BOOK
const myBooks = async (req, res) => {
    try {
      const userBooks = await userModel.findById(req.params.id).populate("books");

      if (!userBooks) {
        return res.status(404).send({
          status: false,
          message: "books not found with this id",
        });
      }
      return res.status(200).send({
        status: true,
        message: "user books",
        userBooks,
      });
    } catch (error) {
      return res.status(400).send({
        status: false,
        message: "error in user blog",
        error,
      });
    }
  };
// ========================================================================//
// idealcase:-
// const bookModel=require('../models/bookModel')
// const userModel = require('../models/userModel')
// // const reviewModel= require('../model/reviewModel')
// const { checkInputsPresent, checkString, validateName, validateTName, validateISBN, validateDate } = require('../Validator/validator')

// const ObjectId = require('mongoose').Types.ObjectId
// const{isValidObjectId}=require("mongoose")


// // ==============================create books======================a=====================


// exports.createBook = async (req, res) => {
//   try {
//     const { title, description, image, user } = req.body;
//     //validation
//     if (!title || !description || !image || !user) {
//       return res.status(400).send({
//         success: false,
//         message: "Please Provide ALl Fields",
//       });
//     }
//     const exisitingUser = await userModel.findById(user);
//     //validaton
//     if (!exisitingUser) {
//       return res.status(404).send({
//         success: false,
//         message: "unable to find user",
//       });
//     }

//     const newBlog = new blogModel({ title, description, image, user });
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await newBlog.save({ session });
//     exisitingUser.blogs.push(newBlog);
//     await exisitingUser.save({ session });
//     await session.commitTransaction();
//     await newBlog.save();
//     return res.status(201).send({
//       success: true,
//       message: "Blog Created!",
//       newBlog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "Error WHile Creting blog",
//       error,
//     });
//   }
// };

 
// //============================================================================//
const getAllBooks= async (req, res) => {
    try {
      const books = await bookModel.find({}).populate("userId");
      if (!books) {
        return res.status(200).send({
          status: false,
          message: "No books Found",
        });
      }
      return res.status(200).send({
        status: true,
        BookCount: books.length,
        message: "All books lists",
        books,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Error WHile Getting books",
        error,
      });
    }
  };

  module.exports= { myBooks, getAllBooks, getbooks , createBook ,getbooksbyId,updateBookById,deleteBook, }