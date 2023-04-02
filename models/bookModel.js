const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: [true, "image is require"],
          },
          bookUrl:{
            type: String,
            required: [true,"bookURL is required"]
          },
        title: {
            type: String,
            required: true,
            unique: true
        },
        excerpt: {
            type: String,
            required: true
        },
        userId: {
            type: ObjectId,
            required: true,
            ref: "user"
        },
        ISBN: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        subcategory: {
            type: String,
            required: true
        },
        reviews: {
            type: Number,
            default: 0

        },
        deletedAt: {
            type: Date
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        releasedAt: {
            type: Date,
            required: true   
        },
        // user: {
        //     type: mongoose.Types.ObjectId,
        //     ref: "user",
        //     required: [true, "user id is required"],
        //   },

    }, { timestamps: true }
)

module.exports = mongoose.model("books", bookSchema)
////////////////////idealcase

// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       require: [true, "title is required"],
//     },
//     description: {
//       type: String,
//       required: [true, "description is require"],
//     },
//     image: {
//       type: String,
//       required: [true, "image is require"],
//     },
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       require: [true, "user id is required"],
//     },
//   },
//   { timestamps: true }
// );

// const blogModel = mongoose.model("Blog", blogSchema);

// module.exports = blogModel;