import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import autobind               from 'autobind-decorator';
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
	Checkbox,
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
import Menu       from '../../container/menu';

import './styles.css';

@autobind
export class TruckList extends Component {

	componentWillMount(){
	    	this.props.load();
	}

	onClickEdit(id){
		history.push('/project/'+id);
	}

	onClickNew(){
		history.push('/project/new');
	}

	renderLine(line){
		const { 
			id,
			description, 
			pts,
			technical_card,
		} = line;
		return (
			<tr onClick={this.onClickEdit.bind(this, id)}>
			<td>{description}</td>
			<td>{pts}</td>
			<td>{technical_card}</td>
			</tr>
		)
	}

	
	render() {
		const { data, locked, error } = this.props;

		const lines = []
		for (var i in data) lines.push( this.renderLine(data[i]) )

		return (
		<div className="container">
			{locked && <Wait size={1} type="cover" />}
			<Row>
			<Menu/>
			</Row>

			<Row>
			{!locked && error && <BlockError error={error} />}
			{!locked && !error && 
			        <div>
				<Col>
				    <Table bordered hover>
					<thead>
						<tr>
							<th>
								Название
							</th>
							<th>
								ПТС
							</th>
							<th>
								Техталон
							</th>
						</tr>
					</thead>
					<tbody>
						{lines}
					</tbody>
				    </Table>
				</Col>
				{<Button key='button-edit' bsStyle="primary" onClick={this.onClickNew}>+</Button>}
				</div>
			}
			</Row>
			</div>
		);
	}
}

const mapStateToProps = state => ({
    locked : state.truckList.locked,
    error  : state.truckList.error,
    data   : state.truckList.data,
});

const mapDispatchToProps = {
    load,
}

injectAsyncReducer('truckList', require('./_reducer').default);

export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
