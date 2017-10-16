const session = require("../session");
const { db, getSessionId } = require('./_helper');

module.exports = function(data, sess, cookie, qs) {
	const id = getSessionId(cookie);
	session.remove(id);
	return {resultCode:0}
}
