import axios from 'axios';
import cache from './module/cache';

let _dispatch;

export default {
	setDispatch : (dispatch) => {_dispatch=dispatch},
	
	login              : (data) => { return post('./login', data)},
	logout             : (data) => { return post('./logout', data)},

	getTaskList        : (data) => { return post('./getTaskList', data)},
	getTask            : (data) => { return post('./getTask', data)},
	setTask            : (data) => { return post('./setTask', data)},
	deleteTask         : (data) => { return post('./deleteTask', data)},

	getProjectList     : (data) => { return post('./getProjectList', data)},
	getProject         : (data) => { return post('./getProject', data)},
	setProject         : (data) => { return post('./setProject', data)},
	deleteProject      : (data) => { return post('./deleteProject', data)},
}
/*
const toQueryString = (data) => {
    let qs = "";
    if (typeof data == 'object') {
        for (var i in data) {
		if (typeof data[i] != 'function') {
			qs = qs + (qs?"&":"") + i + "=" + data[i];
		}
	}
    }
    return (qs ? "?"+qs : "");
}

const get = (url, data) => {
	return axios({
	        method: "GET",
	        url: url + toQueryString(data),
			withCredentials:true 
	}).then(
		_checkAuth
	);
}

const post_as_get = (url, data) => {
	return axios({
	        method: "POST",
	        url: url + toQueryString(data),
		withCredentials:true 
	}).then(
		_checkAuth
	);
}
*/

const post = (url, data) => {
	// åñëè äàííûå åñòü â êýøå, òî çàïðîñ ïîñûëàòü íå áóäåì
	var cached = cache.get(url, data);

	if (cached) {
		console.log('============= CACHE HIT ', url, JSON.stringify(data));
		return Promise.resolve().then(
			result=>{return {data: cached}}
		).then(
			_checkAuth
		)
	} else {
		return axios({
		        method: "POST",
		        url: url,
		        data: data,
			withCredentials:true 
		}).then(
			_checkAuth
		).then(result => {
			cache.put(url, data, result.data);
			return result;
		})
	}
}

const _checkAuth = (result) => {
	if (result && result.data && result.data.resultCode == 0) {
		return result;
	} else {
		if (result && result.data && result.data.resultCode == 30) {  //session expired
			_dispatch({
				type :"LOGOUT",
				error:result.data,
			});
		}
		const data = result ? result.data : undefined;
		return new Promise((resolve, reject) => reject(data));
	}
}



cache.register('/getTaskForTodayList', 'aged'); //caching for 5 min
cache.register('/getTaskDone',         'aged');
cache.register('/getTaskList',         'aged');
cache.register('/getTask',             'aged');
cache.register('/getProjectList',      'aged');
cache.register('/getProject',          'aged');

cache.register('/login',               'clear'); //invalidate all cache
cache.register('/logout',              'clear'); 
cache.register('/setTask',             'clear'); 
cache.register('/deleteTask',          'clear'); 
cache.register('/setProject',          'clear'); 
cache.register('/deleteProject',       'clear'); 
