const { db } = require('./_helper');

module.exports = function(data, sess) {
	const value = db.get('project').value();
	if (data.id) {
		delete value[data.id];
		db.set('project', value).write();
		return {resultCode:0}
	} else {
		return {resultCode:404,resultDescription:'NOT_FOUND'}
	}
}
