const express = require("express");
const bodyParse = require("body-parser");
const ejs = require('ejs');


const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParse.urlencoded({ extended: true }));
app.set('view engine', 'ejs');




/* Get Request */

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get("/signup", function(req, res) {
    res.render('signup.ejs');
});

app.get("/login", function(req, res) {
    res.render('login.ejs');
});


app.get("/main", function(req, res) {
    res.render('main.ejs');
});


/* Post Request */

app.post("/signup", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    if (firstName.length == 0 || lastName.length == 0 || password.length <= 8 || email.length == 0) {
        console.log("Please Enter the required Boxes");
        res.redirect("/signup");
    } else {
        console.log("First Name : " + firstName + "\n Last Name : " + lastName + "\n Email : " + email + "\n Password : " + password);
        res.redirect("/");
    }
});


app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    console.log("Username : " + username + "\n Password : " + password);
    res.redirect("/main");
});





app.listen(port, function() {
    console.log("Server Started at port " + port);
});