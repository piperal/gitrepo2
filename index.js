const express = require('express')
let path = require("path")
const app = express()
const fs = require("fs")
const textRef = "./vanasonad.txt"
const listItems = require("./listItems")
const port = 5114
const dateTime = require("./dateET.js")
let timeNow = new Date();
const bodyparser = require('body-parser')
//add viewengine
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({extended:false}));

console.log(listItems)

app.get("/", (req,res)=>{
	res.render('index')
})


app.get("/visit", (req,res)=>{
	res.render('userinput')
})

	
app.post("/visit", (req,res)=>{
	console.log(req.body)
	fs.open("./public/visitlog.txt", "a",(err,file)=>{
		if(err){
			console.log(err);
			res.send("Tekkis viga")}
		else{
			fs.appendFile("./public/visitlog.txt", req.body.nameInput + ";", (err)=>{
				if(err){
					throw(err)
				}
				else{
					console.log("salvestatud");
					res.render("userinput")
				}
			})
		}
	})
})


app.get("/timenow", (req,res)=>{
	res.render('kellaaeg', {
		fullTime: dateTime.fullTime(),
		fullDate: dateTime.fullDate(),
	})
})

app.get("/vanasonad", (req,res)=>{
	let vanasonad = [];
	fs.readFile(textRef,"utf8", (err,data)=>{
		if(err)
			res.render("viga")
		else{
			vanasonad = data.split(";")
		console.log(vanasonad)
		res.render('vanasonad', {
		vanasonad: vanasonad
	})
		}
	})
})
	

app.get("/pood", (req,res)=>{
	res.send("oled praegu e-poes!")
})

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})