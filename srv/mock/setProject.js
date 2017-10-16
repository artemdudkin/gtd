const { db, randomNumber } = require('./_helper');

module.exports = function(data, sess) {
	const value = db.get('project').value();
	if (!data.id || data.id == 'new') data.id = randomNumber();
	value[data.id] = data;
	db.set('project', value).write();
	return {resultCode:0, id:data.id}
}
