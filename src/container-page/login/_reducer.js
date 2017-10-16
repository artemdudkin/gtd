import {
	LOGIN_OK,
	LOGIN_FAIL,
	LOGIN_START,
} from './_actions';

const initialState = {
  error: '',
  locked: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  
  case LOGIN_START:  
    return {
      error: '',
      locked:true
    };
  
  case LOGIN_OK:
    return {
      error: '',
      locked:false
    };
    
  case LOGIN_FAIL:
    return {
      error: action.error,
      locked:false
    };
    
  default:
    return state;
  }
}