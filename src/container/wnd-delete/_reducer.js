import lodash from 'lodash';
import {
	WND_DELETE_SHOW,
	WND_DELETE_HIDE,
	WND_DELETE_LOCK,
	WND_DELETE_UNLOCK,
} from './_actions';

const initialState = {
  visible : false,
  locked  : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  
  case WND_DELETE_SHOW:
    return {
      visible : true,
      locked  : false,
    };

  case WND_DELETE_HIDE:
    return {
      visible : false,
      locked  : false,
    };

  case WND_DELETE_LOCK:
    return {
      ...state,
      locked  : true,
    };

  case WND_DELETE_UNLOCK:
    return {
      ...state,
      locked  : false,
    };
    
  default:
    return state;
  }
}