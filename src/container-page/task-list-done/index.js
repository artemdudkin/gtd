import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import autobind               from 'autobind-decorator';
import moment                 from 'moment';
import history                from '../../module/history';
import { injectAsyncReducer } from '../../store';

import {
    load,
} from './_actions';

import {
	Alert,
	Table,
	Modal,
	Button,
	FormGroup,
	Col,
	ControlLabel,
	Form,
	FormControl,
        Glyphicon,
	Pagination,
	InputGroup,
	Row
} from 'react-bootstrap';

import Wait       from '../../tag/wait';	
import BlockError from '../../tag/block-error';
import Checkbox   from '../../tag/form-checkbox';
import Menu       from '../../container/menu';

import './styles.css';

@autobind
export class TaskListDone extends Component {

	componentWillMount(){
	    	this.props.load();
	}

	onClickDone(id){
		const { data, locked, error } = this.props;
		this.props.done(id, data[id]);
	}

	renderLine(line){
		const { 
			id,
			name, 
			forToday, 
			done,
		} = line;
		return (
			<tr>
			<td><span style={{paddingLeft:10}}>{name}</span></td>
			</tr>
		)
	}

	renderDate(date) {
		return (
			<tr>
			<td>----------------{date}----------------</td>
			</tr>
		)
	}

	
	render() {
		const { data:raw_data, locked, error } = this.props;

		//filter data
		const data = []
		for (var i in raw_data) {
			if (raw_data[i].done) {
				data.push( {...raw_data[i], id:i} )
			}
		}

		//sort data
		data.sort((a,b)=>{
			return - a.done + b.done;
		});

		//set dates
		for (var i in data) data[i].date = moment(data[i].done).format("YYYY-MM-DD");

		//get dates
		const dates= []
		for (var i in data) {
			if (dates.indexOf(data[i].date)==-1) {
				dates.push(data[i].date);
			}
		}

//console.log('dates', dates);

		const lines = []
		for (var i in dates) {
			lines.push( this.renderDate(dates[i]) );
			for (var j in data) {
				if (data[j].date == dates[i])
				lines.push( this.renderLine(data[j]) )
			}
		}

		return (
		<div className="container">
			{locked && <Wait size={1} type="cover" />}
			<Row>
			<Menu/>
			</Row>

			<Row>
			{!locked && error && <BlockError error={error} />}
			{!locked && !error && 
				<Col>
				    <table style={{borderSpacing: "0px 15px", borderCollapse: "separate"}}>
					<tbody>
						{lines}
					</tbody>
				    </table>
				</Col>
			}
			</Row>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    locked : state.taskListDone.locked,
    error  : state.taskListDone.error,
    data   : state.taskListDone.data,
});

const mapDispatchToProps = {
    load,
}

injectAsyncReducer('taskListDone', require('./_reducer').default);

export default connect(mapStateToProps, mapDispatchToProps)(TaskListDone);
