import reduxState from '../../module/redux-state';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
  
  case 'LOGIN_OK':  
    return {
      name : action.name,
      role : action.role
    };
  
  case 'LOGOUT':  
    reduxState.clear();
    return {
    };
    
  default:
    return state;
  }
}