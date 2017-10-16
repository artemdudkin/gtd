import api from '../../api';

export const PROJECT_LIST_LOCK          = "PROJECT_LIST_LOCK";
export const PROJECT_LIST_OK            = "PROJECT_LIST_OK";
export const PROJECT_LIST_FAIL          = "PROJECT_LIST_FAIL";

export const load = () => (dispatch, getState) => {

	dispatch({type:PROJECT_LIST_LOCK});
	
	api.getProjectList()
	  .then(function (response) {
		const data = response.data;
	  	if (data.resultCode == 0) {
			dispatch({type:PROJECT_LIST_OK, data:data});
		} else {
			dispatch({type:PROJECT_LIST_FAIL, error:data.resultDescription});
		}
	  })
	  .catch(function (error) {
			dispatch({type:PROJECT_LIST_FAIL, error:error});
	  });
}
