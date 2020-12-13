const express = require("express");
const bodyParse = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));
app.use(bodyParse.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
let successMessage = ''


mongoose.connect("mongodb+srv://hackslash:hackslash@cluster0.ykpkp.mongodb.net/FeedbackDB", { useNewUrlParser: true });

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

app.get("/environment", function(req, res) {
    res.render('environment.ejs');
});


app.get("/transport", function(req, res) {
    res.render('transport.ejs');
});

app.get("/culture", function(req, res) {
    res.render('culture.ejs');
});

app.get("/culture", function(req, res) {
    res.render('culture.ejs');
});

app.get("/temple", function(req, res) {
    res.render('temple.ejs');
});

app.get("/jagmohar", function(req, res) {
    res.render('jagmohar.ejs');
});

app.get("/church", function(req, res) {
    res.render('church.ejs');
});

app.get('/feedback', function(req, res) {
    res.render('main', { success: successMessage });
});

/* Post Request */

app.post('/feedback', function(req, res) {
    console.log(req.body);
    const feedbackItem = new Feedback({
        name: req.body.Name,
        email: req.body.Email,
        feedback: req.body.Feedback
    });
    feedbackItem.save();
    console.log(feedbackItem);
    successMessage = 'Thankyou for the feedback';
    res.redirect('/home');

});
let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port, function() {
    console.log("Server Started at port " + port);
});