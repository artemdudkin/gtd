import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import store   from './store';
import history from './module/history';

import createHistory from 'history/createHashHistory';
const hashHistory = createHistory()
history.setHistory(hashHistory);

import Login            from './container-page/login';
import Task             from './container-page/task';
import TaskList         from './container-page/task-list';
import TaskListForToday from './container-page/task-list-for-today';
import TaskListDone     from './container-page/task-list-done';
import Project          from './container-page/project';
import ProjectList      from './container-page/project-list';
import ARoute           from './container/authenticated-route';

export default class Routes extends React.Component {

	render() {
	return (
		<Provider store={store}>
			<Router history={hashHistory}>
				<Switch>
					<ARoute path="/task-list-for-today" component={TaskListForToday}/>
					<ARoute path="/task-list-done"      component={TaskListDone}/>
					<ARoute path="/task-list"           component={TaskList}/>
					<ARoute path="/task/:id/:mode"      component={Task}/>
					<ARoute path="/task/:id"            component={Task}/>
					<ARoute path="/project-list"        component={ProjectList}/>
					<ARoute path="/project/:id"         component={Project}/>

					<Route path="*" component={Login}/>
				</Switch>		
		    </Router>
        	</Provider>
	)}
}
