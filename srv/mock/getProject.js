const { db } = require('./_helper');

module.exports = function(data, sess, cookie, qs) {
	const value = db.get('project').value();
	if (value && value[data.id]) 
		return {resultCode:0, data:value[data.id]}
	else 
		return {resultCode:404,resultDescription:'NOT_FOUND'}
}
