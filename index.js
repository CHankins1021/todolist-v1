/jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food"];
let workItems = ["Show Up"];
let funItems = ["Watch TV", "Read a Book"];
let weekendItems = ["Relax", "Watch TV"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
let day = date.getDate();
res.render("list", {listTitle: day, newListItems: items, headerImage: "http://maui.hawaii.edu/mli/wp-content/uploads/2014/04/UHMC-Header.jpg"});
});

app.post("/", function(req, res) {
let item = req.body.newItem;
if (req.body.list === "Work") {
workItems.push(item);
res.redirect("/work");
} else if (req.body.list === "Fun") {
funItems.push(item);
res.redirect("/fun");
} else if (req.body.list === "Weekend") {
weekendItems.push(item);
res.redirect("/weekend");
} else {
items.push(item);
res.redirect("/");
}
});

app.get("/work", function(req, res){
let day = date.getDate();
res.render("list", {listTitle: "Work To Do List", newListItems: workItems})
});

app.get("/fun", function(req, res){
let day = date.getDate();
res.render("list", {listTitle: "Fun To Do List", newListItems: funItems})
});

app.get("/weekend", function(req, res){
res.render("list", {listTitle: "Weekend To Do List", newListItems: weekendItems})
});

app.get("/finals", function(req, res) {
let finalExamItems = ["MATH 100", "ENG 101", "PSY 101", "HIST 151"];
res.render("finals", {finalExamItems: finalExamItems});
});

app.listen(3000, function() {
console.log("Server is running on port 3000")
});






