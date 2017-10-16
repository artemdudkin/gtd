import React from 'react';
import { connect } from 'react-redux';
import autobind    from 'autobind-decorator';
import lodash      from 'lodash';
import { injectAsyncReducer } from '../../store';

import {
    load,
    edit,
    save,
    remove,
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
class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    componentWillMount(){
	this.clickCancel();
    }
    
    onChange(event) {
    	const id    = event.target.id;
    	const value = event.target.value;    	
    
	this.props.edit_change(id, value);
    }

    clickEdit(){
	const id = lodash.get( this.props, 'match.params.id', '');
    	this.props.edit(id);
    }
    
    clickSave(){
	const { data } = this.props;    
	const id = lodash.get( this.props, 'match.params.id', '');
    	this.props.save(id, data);
    }
    
    clickCancel(){
	const id = lodash.get( this.props, 'match.params.id', '');
    	if (id=='new') {
		this.props.edit_clear();
	} else {
		this.props.load(id);
	}
    }

    clickDeleteShow(){
	this.props.delete_wnd_show();
    }

    clickDeleteOk(){
	const { data } = this.props;    
	const id = lodash.get( this.props, 'match.params.id', '');
	this.props.remove(id);
    }
    
    render() {
	const id   = lodash.get( this.props, 'match.params.id', '');
	const edit = (id == 'new' ? true :  'edit'==lodash.get( this.props, 'match.params.mode', ''));

	const { data, locked, error, save_error } = this.props;

	const { 
		name, 
		forToday, 
		done, 
	} = data;

	return (
		<div className="container">
			{locked && <Wait size={1} type="cover" />}
			<WndDelete name="task" onOk={this.clickDeleteOk}/>
			<Row>
			<Menu/>
			</Row>

			<Row>
			{!locked && error && <BlockError error={error} />}
			{save_error        && <WndError title="Error" error={save_error} onClose={closeError} />}
			{!locked && !error && 
			<div>
			<Col md={5} xs={12}>
				<Form horizontal>
					<FormGroup controlId="name" key="name">
						<Col componentClass={ControlLabel} sm={5}>
							Name
						</Col>
						<Col sm={7}>
							<UniControl 
								editable={edit}
								onChange={this.onChange}
								value={name}
							/>
							
						</Col>
					</FormGroup>
					<FormGroup controlId="forToday" key="forToday">
						<Col componentClass={ControlLabel} sm={5}>
							forToday
						</Col>
						<Col sm={7}>
							<UniControl 
								id="forToday"
								type="boolean"
								editable={edit}
								onChange={this.onChange}
								value={forToday}
							/>
						</Col>
					</FormGroup>
					<FormGroup controlId="done" key="done">
						<Col componentClass={ControlLabel} sm={5}>
							Done
						</Col>
						<Col sm={7}>
							<UniControl 
								id="done"
								type="boolean"
								editable={edit}
								onChange={this.onChange}
								value={done}
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
    locked : state.task.locked,
    error  : state.task.error,
    data   : state.task.data,
    edit   : state.task.edit,
});

const mapDispatchToProps = {
    load,
    edit,
    save,
    remove,
    edit_change,
    edit_clear,

    delete_wnd_show : show,
}

injectAsyncReducer('task', require('./_reducer').default);

export default connect(mapStateToProps, mapDispatchToProps)(Task);
