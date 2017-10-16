import api     from '../../api';
import history from '../../module/history';


export const LOGIN_START = "LOGIN_START";
export const LOGIN_OK   = "LOGIN_OK";
export const LOGIN_FAIL = "LOGIN_FAIL";


export const login = ( name, pwd) => {
  return (dispatch, getState) => {

	dispatch({type:LOGIN_START});
	
	api.login({
		name,
		pwd
	})
	  .then(function (response) {
		const data = response.data;
	  	if (data.resultCode == 0) {
			dispatch({type:LOGIN_OK, name:name, role:data.type});
			history.push('/task-list-for-today');
		} else {
			dispatch({type:LOGIN_FAIL, error:data});
		}
	  })
	  .catch(function (error) {
			dispatch({type:LOGIN_FAIL, error:error});
	  });

  };
}
