import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import autobind               from 'autobind-decorator';
import {sortCaseInsensitiveByName} from '../../module/common';
import history                from '../../module/history';
import { injectAsyncReducer } from '../../store';

import {
    load,
    save,
    changeFilter,
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

	onClickEdit(id){
		history.push('/task/'+id+"/edit");
	}

	onClickChecker(id, type){
//		console.log("ckick", id, type);
		const { data, locked, error } = this.props;

		const new_value = Object.assign({}, data[id]);
		new_value[type] = !new_value[type];
		this.props.save(id, new_value);
	}

	onClickNew(){
		history.push('/task/new');
	}

	onChangeFilterStatus(status){
		const { filter } = this.props;
		filter[status] = !filter[status];
		this.props.changeFilter(filter);
	}

	onChangeFilterName(event){
		const { filter } = this.props;
		filter.name = event.target.value;
		this.props.changeFilter(filter);
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
			<td><Checkbox key={"for-today-"+id} value={forToday} onChange={this.onClickChecker.bind(this, id, "forToday")}></Checkbox></td>
			<td><Checkbox key={"done-"+id} value={done}     onChange={this.onClickChecker.bind(this, id, "done")}></Checkbox></td>
			<td>{name}</td>
			<td><Button key={'button-edit-'+id} onClick={this.onClickEdit.bind(this, id)}>Edit</Button></td>
			</tr>
		)
	}

	
	render() {
		const { data:raw_data, locked, error, filter} = this.props;

		const {done:filter_done, undone:filter_undone, name:filter_name} = filter;

		const data = []
		//filter data
		for (var i in raw_data) {
			if ((filter_done && raw_data[i].done) || (filter_undone && !raw_data[i].done)) {
				if (!filter_name || (filter_name && raw_data[i].name.toLowerCase().indexOf(filter_name.toLowerCase())!=-1)) {
					data.push( {...raw_data[i], id:i} )
				}
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
				<div>
				<Col md={1} xs={2}>
				{<div style={{paddingBottom:20}}><Button key='button-edit' bsStyle="primary" onClick={this.onClickNew}>+</Button></div>}
				</Col>
				<Col md={3} xs={3}>
					<Checkbox style={{display:'inline-block', marginRight:20}} value={filter_done} onChange={this.onChangeFilterStatus.bind(this,'done')}>done</Checkbox>
					<Checkbox style={{display:'inline-block'}} value={filter_undone} onChange={this.onChangeFilterStatus.bind(this,'undone')}>undone</Checkbox>
				</Col>
				<Col md={8} xs={7}>
					<FormGroup>
						<InputGroup>
							<InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
							<FormControl type="text" value={filter_name} onChange={this.onChangeFilterName}/>
						</InputGroup>
					</FormGroup>
				</Col>
				<Col>
				    <Table bordered hover>
					<thead>
						<tr>
							<th>
								forToday
							</th>
							<th>
								Done
							</th>
							<th>
								Name
							</th>
							<th>
							</th>
						</tr>
					</thead>
					<tbody>
						{lines}
					</tbody>
				    </Table>
				</Col>
				{<div style={{paddingBottom:20}}><Button key='button-edit' bsStyle="primary" onClick={this.onClickNew}>+</Button></div>}
				</div>
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
    filter : state.taskList.filter,
});

const mapDispatchToProps = {
    load,
    save,
    changeFilter,
}

injectAsyncReducer('taskList', require('./_reducer').default);

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
