import get from 'lodash.get';
import {
	TASK_LIST_LOCK,
	TASK_LIST_OK,
	TASK_LIST_FAIL,
} from './_actions';

const initialState = {
  error : '',
  locked: false,
  data  : {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  
  case TASK_LIST_LOCK:  
    return {
      ...state,
      error      : false,
      save_error : false,
      locked     : true
    };
  
  case TASK_LIST_OK:
    let data = get(action, "data.data", {});
    
    return {
      save_error : false,
      error      : false,
      locked     : false,
      data       : data,
    };
    
  case TASK_LIST_FAIL:
    return {
      ...state,
      save_error : false,
      error      : action.error,
      locked     : false
    };
    
  default:
    return state;
  }
}