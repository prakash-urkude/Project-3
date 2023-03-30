const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


//env config
dotenv.config();

//router import
const routes = require("./routes/route")

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({orgin:true, credentials:true}));

//routes
app.use(
  function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin',"*")
    next()
  }
)
app.use("/", routes);

// Port
const PORT = process.env.PORT || 3001;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});

