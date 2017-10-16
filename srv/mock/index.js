const { getSession } = require('./_helper');

const deleteProject  =require('./deleteProject');
const deleteTask     =require('./deleteTask');
const getProject     =require('./getProject');
const getProjectList =require('./getProjectList');
const getTask        =require('./getTask');
const getTaskList    =require('./getTaskList');
const login          =require('./login');
const logout         =require('./logout');
const setProject     =require('./setProject');
const setTask        =require('./setTask');

const mock = {
	deleteProject, 
	deleteTask, 
	getProject, 
	getProjectList, 
	getTask, 
	getTaskList, 
	login, 
	logout, 
	setProject, 
	setTask,
}

//authorized-only users (except login)
const wrap = (func) => {
	const old_func = func;
	return (data, cookie, qs) => {
		const sess = getSession(cookie);
		if (sess) {
			return old_func(data, sess, cookie, qs);
		} else {
			return {resultCode:30}
		}
	}
}
for (var i in mock) {
	if (['login'].indexOf(i) == -1) {
		mock[i] = wrap(mock[i]);
	}
}

module.exports = mock;