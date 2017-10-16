const session = require("../session");
const lowdb = require("lowdb");
const db = lowdb('./data.json');

//returns random 6-digit number
const randomNumber = () => {
	return Math.floor(100000 + Math.random() * 900000);
}


const getSessionId = (cookies) => {
	const c = cookies.split(';');
	for (var i in c) {
		const cookie = c[i];
		const cc = cookie.split('=');
		const name  = cc[0].trim();
		const value = cc[1].trim();
		if (name == 's') {
			return value;
		}
	}
	
}
const getSession = (cookies) => {
	return session.get(getSessionId(cookies));
}

module.exports = {
	db,
	randomNumber,
	getSessionId,
	getSession
};
