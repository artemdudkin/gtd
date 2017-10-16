import api from '../../api';

export const TASK_LIST_DONE_LOCK          = "TASK_LIST_DONE_LOCK";
export const TASK_LIST_DONE_OK            = "TASK_LIST_DONE_OK";
export const TASK_LIST_DONE_FAIL          = "TASK_LIST_DONE_FAIL";

export const load = () => (dispatch, getState) => {

	dispatch({type:TASK_LIST_DONE_LOCK});
	
	api.getTaskList()
	  .then(function (response) {
		const data = response.data;
	  	if (data.resultCode == 0) {
			dispatch({type:TASK_LIST_DONE_OK, data:data});
		} else {
			dispatch({type:TASK_LIST_DONE_FAIL, error:data.resultDescription});
		}
	  })
	  .catch(function (error) {
			dispatch({type:TASK_LIST_DONE_FAIL, error:error});
	  });
}