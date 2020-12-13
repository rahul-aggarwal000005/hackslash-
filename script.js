const express = require("express");
const bodyParse = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParse.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
let successMessage = ''


mongoose.connect("mongodb://localhost:27017/FeedbackDB", { useNewUrlParser: true });

const feedbackSchema = {
    name: String,
    email: String,
    feedback: String
}

const Feedback = mongoose.model("Feedback", feedbackSchema);

const rahul = new Feedback({
    name: "Rahul",
    email: "rahul.aggarwal000005@gmail.com",
    feedback: "Best Services Provided"
});

const megha = new Feedback({
    name: "Megha",
    email: "meghaislovely01@gmail.com",
    feedback: "Impressive UI"
});

const vaibhavi = new Feedback({
    name: "Vaibhavi",
    email: "jhavai2201@gmail.com",
    feedback: "Beautiful and smooth working website"
});

const defaultFeedbacks = [rahul, megha, vaibhavi];



/* Get Request */

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.get('/land', function(req, res) {
    res.redirect('/');
});

app.get('/home', function(req, res) {
    res.render('main.ejs', { success: successMessage });
});

app.get("/main", function(req, res) {
    res.render('main.ejs');
});

app.get("/karanji", function(req, res) {
    res.render('karanji.ejs');
});

app.get("/palace", function(req, res) {
    res.render('palace.ejs');
});

app.get('/feedback', function(req, res) {


    Feedback.find({}, function(err, foundFeedback) {
        if (foundFeedback.length === 0) {
            Feedback.insertMany(defaultFeedbacks, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully Added");
                }
            });
            res.redirect('/feedback');
        } else {
            console.log("loggest your entry");
            res.render('main', { success: successMessage });
        }
    });
});

/* Post Request */

app.post('/feedback', function(req, res) {
    const useremail = req.body.userEmail;
    const username = req.body.userName;
    const userfeedback = req.body.feedback;
    if (useremail == '' || username == '' || userfeedback == '') {
        success = '';
    } else {

        const feedbackItem = new Feedback({
            name: username,
            email: useremail,
            feedback: userfeedback
        });
        feedbackItem.save();
        console.log("Your data is saved");
        successMessage = 'Thankyou for the feedback';
        res.redirect('/home');
    }
});






app.listen(port, function() {
    console.log("Server Started at port " + port);
});