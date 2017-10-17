import get from 'lodash.get';
import {
	TASK_LIST_LOCK,
	TASK_LIST_OK,
	TASK_LIST_FAIL,
	TASK_LIST_FILTER,
} from './_actions';

const initialState = {
  error : '',
  locked: false,
  data  : {},
  filter : {done:false, undone:true, name:''}
};

export default (state = initialState, action) => {
  switch (action.type) {

  case TASK_LIST_FILTER:
    return {
      ...state,
      filter     : {...action.filter},
    };
  
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
      ...state,
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