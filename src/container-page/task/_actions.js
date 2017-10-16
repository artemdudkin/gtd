import api from '../../api';
import history from '../../module/history';

export const TASK_LOCK          = "TASK_LOCK";
export const TASK_OK            = "TASK_OK";
export const TASK_FAIL          = "TASK_FAIL";
export const TASK_EDIT_CHANGE   = "TASK_EDIT_CHANGE";
export const TASK_EDIT_CLEAR    = "TASK_EDIT_CLEAR";
export const TASK_SAVE_ERROR    = "TASK_SAVE_ERROR";

import {
//    show,
    hide,
    lock,
    unlock,
} from '../../container/wnd-delete/_actions';


let _saved_data;

export const load = (id) => (dispatch, getState) => {

	dispatch({type:TASK_LOCK});
	
	api.getTask({id:id})
	  .then(function (response) {
		const data = response.data;
	  	if (data.resultCode == 0) {
			dispatch({type:TASK_OK, data:data});
		} else {
			dispatch({type:TASK_FAIL, error:data.resultDescription});
		}
	  })
	  .catch(function (error) {
			dispatch({type:TASK_FAIL, error:error});
	  });
}

export const edit = (id) => (dispatch, getState) => {
	history.push('/task/' + id + "/edit");
}

export const edit_change = (id, value) => {
	return {type:TASK_EDIT_CHANGE, id, value};
}

export const edit_clear = () => {
	return {type:TASK_EDIT_CLEAR};
}


export const save = (id, data) => (dispatch, getState) => {
	dispatch({type:TASK_LOCK});
	
	api.setTask({...data, id:id})
	  .then(function (response) {
		const data = response.data;
	  	if (data.resultCode == 0) {
			history.push('/task/'+data.id);
			dispatch(load(data.id));
		} else {
			dispatch({type:TASK_SAVE_ERROR, error:data.resultDescription});
		}
	  })
	  .catch(function (error) {
			dispatch({type:TASK_SAVE_ERROR, error:error});
	  });
}

export const remove = (id) => (dispatch, getState) => {
	if (id) {
		dispatch(lock());
		api.deleteTask({id:id})
		.then(result => {
			dispatch(hide());
			history.push('/task-list');
		}).catch(error => {
			dispatch(unlock());
			dispatch({
				type  : DRIVER_SAVE_ERROR,
				error : error
			})
		})
	}
}