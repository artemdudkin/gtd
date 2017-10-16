import React from 'react';
import { connect } from 'react-redux';
import autobind    from 'autobind-decorator';
import lodash      from 'lodash';
import { injectAsyncReducer } from '../../store';

import {
    load,
    save,
    remove,
    edit_start,
    edit_rollback,
    edit_change,
    edit_clear,
} from './_actions';

import {
    show,
} from '../../container/wnd-delete/_actions';

import {
	Button,
	FormGroup,
	InputGroup,
	Col,
	ControlLabel,
	Form,
	FormControl,	
	Glyphicon,
	Row
} from 'react-bootstrap';

import WndDelete  from '../../container/wnd-delete';

import Text       from '../../tag/form-text';
import Wait       from '../../tag/wait';	
import WndError   from '../../tag/wnd-error';
import BlockError from '../../tag/block-error';
import DatePicker from '../../tag/form-datepicker';
import Checkbox   from '../../tag/form-checkbox';
import UniControl from '../../tag/uni-control';
import Menu       from '../../container/menu';

import './styles.css';

@autobind
class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    componentWillMount(){
	const id = lodash.get( this.props, 'match.params.id', '');
    	if (id=='new') {
		this.props.edit_clear();
	} else {
		this.props.load(id);
	}
    }
    
    onChange(event) {
    	const id    = event.target.id;
    	const value = event.target.value;    	
    
	this.props.edit_change(id, value);
    }
    
    clickEdit(event){
	const { data } = this.props;
    	this.props.edit_start(data);
    }
    
    clickSave(){
	const { data } = this.props;    
	const id = lodash.get( this.props, 'match.params.id', '');
    	this.props.save(id, data);
    }
    
    clickCancel(){
	this.props.edit_rollback();
    }

    clickDeleteShow(){
	this.props.delete_wnd_show();
    }

    clickDeleteOk(){
	const id = lodash.get( this.props, 'match.params.id', '');
	this.props.remove(id);
    }
    
    render() {
	const id = lodash.get( this.props, 'match.params.id', '');
	let { edit } = this.props;
	if (id == 'new') {
		edit = true;
	}

	const { data, locked, error, save_error } = this.props;

	const { 
		description, 
		pts,
		technical_card,
	} = data;

	return (
		<div className="container">
			{locked && <Wait size={1} type="cover" />}
			<WndDelete name="project" onOk={this.clickDeleteOk}/>
			<Row>
			<Menu/>
			</Row>

			<Row>
			{!locked && error && <BlockError error={error} />}
			{save_error        && <WndError title="Error" error={save_error} onClose={closeError} />}
			{!locked && !error && 
			<div>
			<Col componentClass={ControlLabel} md={5} xs={12}>
				<Form horizontal>
					<FormGroup controlId="description" key="description">
						<Col componentClass={ControlLabel} sm={5}>
							Название
						</Col>
						<Col sm={7}>
							<UniControl 
								editable={edit}
								onChange={this.onChange}
								value={description}
							/>
						</Col>
					</FormGroup>
					<FormGroup controlId="pts" key="pts">
						<Col componentClass={ControlLabel} sm={5}>
							ПТС
						</Col>
						<Col sm={7}>
							<UniControl 
								editable={edit}
								onChange={this.onChange}
								value={pts}
							/>
						</Col>
					</FormGroup>
					<FormGroup controlId="technical_card" key="technical_card">
						<Col componentClass={ControlLabel} sm={5}>
							Техталон
						</Col>
						<Col sm={7}>
							<UniControl 
								editable={edit}
								onChange={this.onChange}
								value={technical_card}
							/>
						</Col>
					</FormGroup>
				</Form>	
				{!edit && <div style={{float:'right'}}>
						<Button key='button-edit' bsStyle="primary" onClick={this.clickEdit}>Edit</Button>&nbsp;&nbsp;
						<Button key='button-delete' onClick={this.clickDeleteShow}>Delete</Button>
					</div>
				}
				{edit &&
	                               <div style={{float:'right'}}>
	                               		<Button key='button-save' bsStyle="primary" onClick={this.clickSave}>Save</Button>&nbsp;&nbsp;
	                               		<Button key='button-cancel' onClick={this.clickCancel}>Cancel</Button>
	                               	</div>
				}
			</Col>
			</div>
			}
			</Row>
		</div>		
        );
    }
}

const mapStateToProps = state => ({
    locked : state.project.locked,
    error  : state.project.error,
    data   : state.project.data,
    edit   : state.project.edit,
});

const mapDispatchToProps = {
    load,
    save,
    remove,
    edit_start,
    edit_rollback,
    edit_change,
    edit_clear,

    delete_wnd_show : show,
}

injectAsyncReducer('project', require('./_reducer').default);

export default connect(mapStateToProps, mapDispatchToProps)(Project);
