const fs = require("fs");
const sonad = "./vanasonad.txt";


const listWisdom =(txt)=>{
	let wordArr = txt.split(";");
	for(let i = 0; i < wordArr.length;i++){
	console.log(i + ")" + wordArr[i])
	}
}

function readfile(){
	fs.readFile(sonad, "utf8",(err, data)=>{
		if(err){
			console.log(err)
		}
		else{
			listWisdom(data)
		}
	})
}
readfile()