const express =require("express");
const path = require("path");
const fs = require("fs");
const app=express();
const mongoose=require("mongoose");
const bodyparser =require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
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