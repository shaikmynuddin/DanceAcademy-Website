const express =require("express");
const path = require("path");
const fs = require("fs");
const app=express();
const mongoose=require("mongoose");
const bodyparser =require("body-parser");
require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT || 8000;
const MONGODB_CONNECT_URI = process.env.MONGODB_CONNECT_URI;

// Database connection
mongoose.connect(MONGODB_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));
// mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
const port=8000;


//define mongoose
const contactSchema = new mongoose.Schema({
	name: String,
	phone: String,
	email: String,
	address: String,
	desc: String
  });

var Contact =mongoose.model('contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// / ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send("This item has been saved to database");
    }).catch(()=>{
        res.status(400).send("Item was not saved");
    })
    // res.status(200).render('contact.pug');
});


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});