import api from '../../api';

export const TASK_LIST_LOCK          = "TASK_LIST_LOCK";
export const TASK_LIST_OK            = "TASK_LIST_OK";
export const TASK_LIST_FAIL          = "TASK_LIST_FAIL";
export const TASK_LIST_FILTER        = "TASK_LIST_FILTER";

export const load = () => (dispatch, getState) => {

	dispatch({type:TASK_LIST_LOCK});
	
	api.getTaskList()
	  .then(function (response) {
console.log("api.getTaskList", response);
		const data = response.data;
	  	if (data.resultCode == 0) {
			dispatch({type:TASK_LIST_OK, data:data});
		} else {
			dispatch({type:TASK_LIST_FAIL, error:data.resultDescription});
		}
	  })
	  .catch(function (error) {
			dispatch({type:TASK_LIST_FAIL, error:error});
	  });
}


export const save = (id, data) => (dispatch, getState) => {

	dispatch({type:TASK_LIST_LOCK});

	const value = {...data, id:id}
	if (value.done && typeof value.done == 'boolean') value.done = Date.now()
	
	api.setTask(value)
	  .then(function (response) {
		dispatch(load());
	  })
	  .catch(function (error) {
		dispatch(load());
	  });
}

export const changeFilter = (filter) => (dispatch, getState) => {
	dispatch({type:TASK_LIST_FILTER, filter});
}