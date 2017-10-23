import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import autobind               from 'autobind-decorator';
import history                from '../../module/history';
import {sortCaseInsensitiveByName} from '../../module/common';
import { injectAsyncReducer } from '../../store';

import {
    load,
    done
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
export class TaskList extends Component {

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
		if (!done)
			return (
				<tr>
				<td><Button key={'button-done-'+id} onClick={this.onClickDone.bind(this,id)}>Done</Button></td>
				<td><span style={{paddingLeft:10}}>{name}</span></td>
				</tr>
			)
		else 
			return null;
	}

	
	render() {
		const { data:raw_data, locked, error } = this.props;

		//filter data
		const data = []
		for (var i in raw_data) {
			if (raw_data[i].forToday && !raw_data[i].done) {
				data.push( {...raw_data[i], id:i} )
			}
		}

		//sort data
		data.sort(sortCaseInsensitiveByName);

		const lines = []
		for (var i in data) lines.push( this.renderLine(data[i]) )

		return (
		<div className="container">
			{locked && <Wait size={1} type="fixed" />}
			<Row>
			<Menu/>
			</Row>

			<Row>
			{!locked && error && <BlockError error={error} />}
			{!error && 
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
    locked : state.taskList.locked,
    error  : state.taskList.error,
    data   : state.taskList.data,
});

const mapDispatchToProps = {
    load,
    done
}

injectAsyncReducer('taskList', require('./_reducer').default);

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
