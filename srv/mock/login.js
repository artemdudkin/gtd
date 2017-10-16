const session = require("../session");
const { db } = require('./_helper');

module.exports = function(data) {
	const user = db.get('user').value();
	const u = user.filter(_user=>(_user.name == data.name && _user.pwd == data.pwd))[0]
	if (u) {
		const id = session.new(u);
		return [
			{resultCode:0, type:u.type},
			[{name:"Set-Cookie", value:"s="+id}]
		]
	} else {
		return {resultCode:-1, resultDescription:'LOGIN_WRONG_CREDS'}
	}
}
