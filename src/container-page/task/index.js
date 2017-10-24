import React from 'react';
import { connect } from 'react-redux';
import autobind    from 'autobind-decorator';
import get         from 'lodash.get';
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
	Badge,
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

    componentWillUpdate(nextProps, nextState) {
	const id = get( nextProps, 'match.params.id', '');
	const { data } = nextProps;
	if (data.id && id === 'new') {
		//should work ONLY when user pressed Add after new item was created
		//(componentWillMount will not be fired in this case as it is same page)
		this.clickCancel(nextProps);
	}
    }
    
    onChange(event) {
    	const id  = event.target.id;
    	let value = event.target.value;

	if (id=="done" && value==true) value=Date.now();

	this.props.edit_change(id, value);
    }

    clickEdit(){
	const id = get( this.props, 'match.params.id', '');
    	this.props.edit(id);
    }
    
    clickSave(){
	const { data } = this.props;    
	const id = get( this.props, 'match.params.id', '');
    	this.props.save(id, data);
    }
    
    clickCancel(props){
	if (!props) props = this.props;
	const id = get( props, 'match.params.id', '');
    	if (id=='new') {
		props.edit_clear();
	} else {
		props.load(id);
	}
    }

    clickDeleteShow(){
	this.props.delete_wnd_show();
    }

    clickDeleteOk(){
	const { data } = this.props;    
	const id = get( this.props, 'match.params.id', '');
	this.props.remove(id);
    }

    clickBadge( value ){
	const { data } = this.props;
	const { name } = data;

	this.props.edit_change("name", value + ": " + (name || ""));
    }

    getTags(){
	const { dataList:raw_data } = this.props;
	const tags = [];
	for (var i in raw_data) {
		const s = raw_data[i].name.split(":");
		if (s[1]) {
			const name = s[0].trim().toUpperCase();
			let index=-1; 
			for (var i=0; i<tags.length && index==-1; i++) {
				if ((tags[i].name||"").trim().toUpperCase() == name) index=i;
			}

			if (index == -1) {
				tags.push({name:s[0], qty:1});
			} else {
				tags[index].qty++; 
			}
		}
	}
	tags.sort( (a, b)=>{
		if (a.qty < b.qty) return 1;
		if (a.qty > b.qty) return -1;
		return 0;
	})
//console.log("TAGS", tags);
//console.log("TAGS SHOW", tags.filter(_=>(_.qty>1)));
//console.log("TAGS SHOW NAMES", tags.filter(_=>(_.qty>1)).map(_=>_.name));

	return tags;
    }
    
    render() {
	const id   = get( this.props, 'match.params.id', '');
	const edit = (id == 'new' ? true :  'edit'== get( this.props, 'match.params.mode', ''));

	const tags = edit ? this.getTags() : [];

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
							<UniControl ref="name"
								editable={edit}
								onChange={this.onChange}
								value={name} />

							{tags.filter((_,index) => {
								return index < 6;
							})
							.map(_=>{
								return <span><Badge style={{cursor:'pointer', backgroundColor: '#337ab7', marginTop:20}} onClick={this.clickBadge.bind(this, _.name)}>{_.name}</Badge>&nbsp;&nbsp;&nbsp;&nbsp;</span>
							},this)}
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
					{id != 'new' &&
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
					}
				</Form>	
				{!edit && <div style={{float:'right'}}>
						<Button key='button-edit' bsStyle="primary" onClick={this.clickEdit}>Edit</Button>&nbsp;&nbsp;
						<Button key='button-delete' onClick={this.clickDeleteShow}>Delete</Button>
					</div>
				}
				{edit &&
					<div>
					<Col sm={3}>
					</Col>
					<Col sm={2}>
					{id != 'new' &&
					  <div style={{float:'left'}}>
						<Button key='button-delete' onClick={this.clickDeleteShow}>Delete</Button>
					  </div>
					}
					</Col>
					<Col sm={7}>
					<div style={{float:'right'}}>
	                               		<Button key='button-save' bsStyle="primary" onClick={this.clickSave}>Save</Button>&nbsp;&nbsp;
	                               		<Button key='button-cancel' onClick={this.clickCancel}>Cancel</Button>
	                               	</div>
					</Col>
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
    locked   : state.task.locked,
    error    : state.task.error,
    data     : state.task.data,
    edit     : state.task.edit,
    dataList : (state.taskList ? state.taskList.data : {}),
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
