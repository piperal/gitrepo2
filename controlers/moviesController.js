const mysql = require("mysql2")


const config = 
{
	host: "localhost",
	user: "if25",
	password: "DTI2025",
	database: "if25_piperal"
}

const conn = mysql.createConnection(config);


//Homepage for movies
const movie =(req,res)=>{
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
}


//Get people from db
const people = async (req,res)=>{
	let conn;
	const sqlReq = "SELECT * FROM person";
	try{
		conn = await mysql.createConnection(config);
		conn.execute(sqlReq, (err, rows)=>{
		if(err){
			throw(err);
		}
		else {
			console.log(rows)
			res.render("people",{
				people: rows
			})
		}
	});
	}
	catch(err){
		console.log(err)
	}
	finally{
		if(conn){
			await conn.end();
			console.log("Ühendus Suletud")
		}
	}
}
//Page to add people to the db
const add = (req,res)=>{
	res.render("addpeople")
}
const job = (req,res)=>{
			res.render('position')
}

const jobpost = (req,res)=>{
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
}

const viewjob = (req,res)=>{
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
}

//"addpeople" POST method 
const addpost = async (req,res)=>{
	let sqlReq = "";
	console.log(req.body.born)
	if(req.body.death === ""){
	sqlReq = `INSERT INTO person VALUES (NULL,"${req.body.actorFirstName}","${req.body.actorLastname}",${req.body.born},NULL)`;
	}
	else{
		sqlReq = `INSERT INTO person VALUES (NULL,"${req.body.actorFirstName}","${req.body.actorLastname}",${req.body.born},${req.body.death})`;
	}
	conn.execute(sqlReq, (err, sqlres)=>{
		if(err){
			throw(err);
		}
		else {
			console.log("Salvestatud");
		}
	});
}

module.exports = {
	movie,
	people,
	add,
	addpost,
	job,
	jobpost,
	viewjob}