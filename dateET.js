let timeNow = new Date();

const dateNowFormattedET = function(){
	const monthNamesET = ["jaanuar", "veebruar", "mأ¤rts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
	return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
}

const timeNowFormattedET = function(){
	return timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
}

const weekDayNowET = function(){
	const weekdayNamesEt = ["pأ¼hapأ¤ev", "esmaspأ¤ev", "teisipأ¤ev", "kolmapأ¤ev", "neljapأ¤ev", "reede", "laupأ¤ev"];
	return weekdayNamesEt[timeNow.getDay()];
}

const partOfDay = function(){
	let hour = timeNow.getHours();
	if(hour < 12){
		return("Tere hommikut!")
	}
	else if(hour >= 12){
		return("Head lõunat!")
	}
	else if(hour > 16){
		return("Head õhtut!")
	}
}

module.exports = {fullDate: dateNowFormattedET, fullTime: timeNowFormattedET, weekDay: weekDayNowET,currTime: partOfDay};