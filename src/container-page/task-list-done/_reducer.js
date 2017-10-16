import lodash from 'lodash';
import {
	TASK_LIST_DONE_LOCK,
	TASK_LIST_DONE_OK,
	TASK_LIST_DONE_FAIL,
} from './_actions';

const initialState = {
  error : '',
  locked: false,
  data  : {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  
  case TASK_LIST_DONE_LOCK:  
    return {
      ...state,
      error      : false,
      save_error : false,
      locked     : true
    };
  
  case TASK_LIST_DONE_OK:
    let data = lodash.get(action, "data.data", {});
    
    return {
      save_error : false,
      error      : false,
      locked     : false,
      data       : data,
    };
    
  case TASK_LIST_DONE_FAIL:
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