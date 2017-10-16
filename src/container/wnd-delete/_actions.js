import api from '../../api';
import history from '../../module/history';

export const WND_DELETE_SHOW   = "WND_DELETE_SHOW";
export const WND_DELETE_HIDE   = "WND_DELETE_HIDE";
export const WND_DELETE_LOCK   = "WND_DELETE_LOCK";
export const WND_DELETE_UNLOCK = "WND_DELETE_UNLOCK";

export const show = () => {
	return {type  : WND_DELETE_SHOW}
}

export const hide = () => {
	return {type : WND_DELETE_HIDE}
}

export const lock = () => {
	return {type : WND_DELETE_LOCK}
}

export const unlock = () => {
	return {type : WND_DELETE_UNLOCK}
}

