import api from '../../api';

export const logout = () => (dispatch, getState) => {
	api.logout();
	dispatch({type:"LOGOUT"});
}

