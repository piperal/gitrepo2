const express = require('express')
let path = require("path")
const app = express()
const fs = require("fs")
const textRef = "./vanasonad.txt"
const listItems = require("./listItems")
const mysql = require("mysql2")
const port = 5114
const dateTime = require("./dateET.js")
let timeNow = new Date();
const bodyparser = require('body-parser')


const conn = mysql.createConnection({
	host: "localhost",
	user: "if25",
	password: "DTI2025",
	database: "if25_piperal"
});


//add viewengine
app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "/public")));
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
			fs.appendFile("./public/visitlog.txt", req.body.nameInput + " " + req.body.lastNameInput +", " + dateTime.fullDate() + " " +  dateTime.fullTime() + ";", (err)=>{
				if(err){
					throw(err)
				}
				else{
					console.log("salvestatud");
					res.render("registered", {
						fName: req.body.nameInput,
						lName: req.body.lastNameInput
					})
				}
			})
		}
	})
})

app.get("/visitors", (req,res)=>{
	let visitors = [];
		fs.readFile("./public/visitlog.txt","utf8",(err,file)=>{
		if(err){
			console.log(err);
			res.send("Tekkis viga")}
		else{
			visitors = file.split(";");
			res.render("visitors",{
					visitors: visitors
			});

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
	

app.get("/movies/new", (req,res)=>{
			res.render('position')
})

app.post("/movies/new", (req,res)=>{
	console.log(req.body)
	
	const sqlReq = `INSERT INTO position VALUES (NULL,"${req.body.posName}","${req.body.posDesc}")`;
	
	conn.execute(sqlReq, (err, sqlres)=>{
		if(err){
			throw(err);
		}
		else {
			console.log("Salvestatud");
			res.redirect("/movies/pos")
		}
	});
})

app.get("/movies/pos", (req,res)=>{
	const sqlReq = "SELECT * FROM position";
	conn.execute(sqlReq, (err, sqlres)=>{
		if(err){
			throw(err);
		}
		else {
			res.render('positions',{
				positions: sqlres
			})
			console.log(sqlres);
		}
	});
})

app.get("/movies",(req,res)=>{
	const sqlReq = "SELECT * FROM movie";
	conn.execute(sqlReq, (err, sqlres)=>{
		if(err){
			throw(err);
		}
		else {
			console.log(sqlres)
			res.render('movies',{
				movies: sqlres
			})
		}
	});
})

app.get("/movies/people", (req,res)=>{
	const sqlReq = "SELECT * FROM person";
	conn.execute(sqlReq, (err, sqlres)=>{
		if(err){
			throw(err);
		}
		else {
			res.render("people",{
				people: sqlres
			})
			console.log(sqlres)
		}
	});
})


app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})