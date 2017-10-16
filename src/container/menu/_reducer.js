const initialState = [
	{name:"task",       href:"#/task-list-for-today", label:"T-today"},
	{name:"all-tasks",  href:"#/task-list",           label:"T-all"},
	{name:"done-tasks", href:"#/task-list-done",      label:"T-done"},
	{name:"task-add",   href:"#/task/new",            label:"Add"},
	{name:"project",    href:"#/project-list",        label:"Projects"},
];

export default (state = initialState, action) => {
	switch (action.type) {
  
	case 'LOGIN_OK':  
//		if (action.role == 'carrier') {
//			return Object.assign([], initialState_carrier)
//		} else {
//			return Object.assign([], initialState_manager)
//		}

		return Object.assign([], initialState)
    
	default:
		return state;
	}
}