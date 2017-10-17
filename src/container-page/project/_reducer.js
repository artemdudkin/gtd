import get from 'lodash.get';
import {
	PROJECT_LOCK,
	PROJECT_OK,
	PROJECT_FAIL,
	PROJECT_EDIT_START,
	PROJECT_EDIT_FINISH,
	PROJECT_EDIT_ROLLBACK,
	PROJECT_EDIT_CHANGE,
	PROJECT_EDIT_CLEAR,
	PROJECT_SAVE_ERROR
} from './_actions';

const initialState = {
  error : '',
  locked: false,
  data  : {},
  edit  : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  
  case PROJECT_LOCK:  
    return {
      ...state,
      error      : false,
      save_error : false,
      locked     : true
    };
  
  case PROJECT_OK:
    let data = get(action, "data.data", {});
    
    return {
      save_error : false,
      error      : false,
      locked     : false,
      data       : data,
    };
    
  case PROJECT_FAIL:
    return {
      ...state,
      save_error : false,
      error      : action.error,
      locked     : false
    };

  case PROJECT_SAVE_ERROR:
    return {
      ...state,
      save_error : action.error,
      error      : false,
      locked     : false
    };
    
  case PROJECT_EDIT_CHANGE:  
    const new_data = Object.assign({}, state.data);
    new_data[action.id] = action.value;

    return {
      ...state,
      data: new_data,
    };

  case PROJECT_EDIT_CLEAR:
    return {
      ...state,
      data: {},
    };
    
  case PROJECT_EDIT_START:
    return {
      ...state,
      edit: true,
    };
  
  case PROJECT_EDIT_FINISH:
    return {
      ...state,
      edit: false,
    };
    
  case PROJECT_EDIT_ROLLBACK:
    return {
      ...state,
      edit : false,
      data : action.data
    };
    
  default:
    return state;
  }
}