import api from '../../api';
import history from '../../module/history';

export const PROJECT_LOCK          = "PROJECT_LOCK";
export const PROJECT_OK            = "PROJECT_OK";
export const PROJECT_FAIL          = "PROJECT_FAIL";
export const PROJECT_EDIT_START    = "PROJECT_EDIT_START";
export const PROJECT_EDIT_FINISH   = "PROJECT_EDIT_FINISH";
export const PROJECT_EDIT_ROLLBACK = "PROJECT_EDIT_ROLLBACK";
export const PROJECT_EDIT_CHANGE   = "PROJECT_EDIT_CHANGE";
export const PROJECT_EDIT_CLEAR    = "PROJECT_EDIT_CLEAR";
export const PROJECT_SAVE_ERROR    = "PROJECT_SAVE_ERROR";

import {
//    show,
    hide,
    lock,
    unlock,
} from '../../container/wnd-delete/_actions';

let _saved_data;

export const load = (id) => (dispatch, getState) => {

	dispatch({type:PROJECT_LOCK});
	
	api.getProject({id:id})
	  .then(function (response) {
		const data = response.data;
	  	if (data.resultCode == 0) {
			dispatch({type:PROJECT_OK, data:data});
		} else {
			dispatch({type:PROJECT_FAIL, error:data.resultDescription});
		}
	  })
	  .catch(function (error) {
			dispatch({type:PROJECT_FAIL, error:error});
	  });
}

export const edit_start = (data) => (dispatch, getState) => {
	_saved_data = Object.assign([], data);
	dispatch({type:PROJECT_EDIT_START});
}

export const edit_finish = () => {
	return {type:PROJECT_EDIT_FINISH};
}

export const edit_rollback = () => (dispatch, getState) => {
	//OMG нажимается кнопка edit сразу же?!
	setTimeout(function(){
		dispatch({type:PROJECT_EDIT_ROLLBACK, data:_saved_data});
		_saved_data = undefined;
	}, 100);
}

export const edit_change = (id, value) => {
	return {type:PROJECT_EDIT_CHANGE, id, value};
}

export const edit_clear = () => {
	return {type:PROJECT_EDIT_CLEAR};
}


export const save = (id, data) => (dispatch, getState) => {
	dispatch({type:PROJECT_LOCK});
	
	api.setProject({...data, id:id})
	  .then(function (response) {
		const data = response.data;
	  	if (data.resultCode == 0) {
			dispatch(edit_finish());

			if (data.id != id) {
				history.push('/project/'+data.id);
				dispatch(load(data.id));
			} else {
				dispatch(load(id));
			}
		} else {
			dispatch({type:PROJECT_SAVE_ERROR, error:data.resultDescription});
		}
	  })
	  .catch(function (error) {
			dispatch({type:PROJECT_SAVE_ERROR, error:error});
	  });
}

export const remove = (id) => (dispatch, getState) => {
	if (id) {
		dispatch(lock());
		api.deleteProject({id:id})
		.then(result => {
			dispatch(hide());
			history.push('/project-list');
		}).catch(error => {
			dispatch(unlock());
			dispatch({
				type  : DRIVER_SAVE_ERROR,
				error : error
			})
		})
	}
}

