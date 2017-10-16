let _history;
let _dispatch;

export default {
	setHistory : (history) => {
		_history = history;
	},

	setDispatch : (dispatch) => {
		_dispatch = dispatch;
	},

	push : (url) => {
		_dispatch({type:"@@router::PUSH", url:url})
		_history.push(url);
	},
}
