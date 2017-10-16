const { db } = require('./_helper');

module.exports = function(data, sess, cookie, qs) {
	const value = db.get('project').value();
	return {resultCode:0, data:value};
}
