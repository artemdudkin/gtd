const { db } = require('./_helper');

module.exports = function(data, sess, cookie, qs) {
	const value = db.get('task').value();
	return {resultCode:0, data:value};
}
