import get from 'lodash.get';
import {
	TASK_LOCK,
	TASK_OK,
	TASK_FAIL,
	TASK_EDIT_CHANGE,
	TASK_EDIT_CLEAR,
	TASK_SAVE_ERROR
} from './_actions';

const initialState = {
  error : '',
  locked: false,
  data  : {},
  edit  : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  
  case TASK_LOCK:  
    return {
      ...state,
      error      : false,
      save_error : false,
      locked     : true
    };
  
  case TASK_OK:
    let data = get(action, "data.data", {});
    
    return {
      save_error : false,
      error      : false,
      locked     : false,
      data       : data,
    };
    
  case TASK_FAIL:
    return {
      ...state,
      save_error : false,
      error      : action.error,
      locked     : false
    };

  case TASK_SAVE_ERROR:
    return {
      ...state,
      save_error : action.error,
      error      : false,
      locked     : false
    };
    
  case TASK_EDIT_CHANGE:  
    const new_data = Object.assign({}, state.data);
    new_data[action.id] = action.value;

    return {
      ...state,
      data: new_data,
    };

  case TASK_EDIT_CLEAR:  
    return {
      ...state,
      data: {},
    };
    
  default:
    return state;
  }
}