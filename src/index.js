const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const app = express();


app.use(bodyParser.json());

// Database of this project is in group4Database folder
mongoose.connect("mongodb+srv://prakashurkude:prakash1998@cluster0.nuhssqs.mongodb.net/group4Database")

    .then(() => console.log('mongodb is connected'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen( 3000, function () {
    console.log('Express app running on port ' + (3000))
});
