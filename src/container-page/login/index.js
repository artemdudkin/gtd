import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import version from '../../module/version';
import { injectAsyncReducer } from '../../store';

import {
  Button,
  Col,
  FormControl,
  FormGroup,
  Glyphicon,
  InputGroup
} from 'react-bootstrap';

import Wait from '../../tag/wait';

import {
    login
} from './_actions';




import './styles.css';






@autobind
class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
        	name : '',
        	pwd  : '',
    
        }
    }
    
    componentDidMount(){
    	const node = ReactDOM.findDOMNode(this.refs.name);
		if (node && node.focus instanceof Function) {
            node.focus();
        }    	
    }
    
	onKeyDown(event){
		if (event.keyCode == 13) {
			this.clickLogin();
			event.preventDefault()
			event.stopPropagation()
		}
	}
    
    clickLogin(){
    	const {name, pwd} = this.state;     
    	this.props.login(name, pwd);
    }
    
    onChange(name, event){
    	const state = {}
    	state[name] = event.target.value;
    	this.setState(state);
    }

    render() {
    	const {error, locked} = this.props;
    	const {name, pwd} = this.state;
    	
		return (

<div style={{position:"relative"}}>
<div className="page-login-version">{"v." + version}</div>

          <Col md={4} mdPush={4} onKeyDown={this.onKeyDown}>

<br/>
<br/>
{error ? <div><div style={{color:'red'}}>{JSON.stringify(error)}</div><br/></div> : <div><div>&nbsp;</div><br/></div>}

          <FormGroup>
            <InputGroup>
              <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
              <FormControl ref="name" disabled={locked} type="text" value={name} onChange={this.onChange.bind(this, 'name')}/>
            </InputGroup>
<br/>

            <InputGroup>
              <InputGroup.Addon><Glyphicon glyph="lock" /></InputGroup.Addon>
              <FormControl disabled={locked} type="password" value={pwd} onChange={this.onChange.bind(this, 'pwd')}/>
            </InputGroup>

          </FormGroup>

          {locked ? <Wait size={0}/>
                    : <Button bsStyle="primary"  style={{float:'right'}} onClick={this.clickLogin}>Login</Button>
	}

          </Col>
</div>
        );

    }
}

const mapStateToProps = state => ({
    error: state.login.error,
    locked : state.login.locked,
});

const mapDispatchToProps = {
    login
}

injectAsyncReducer('login', require('./_reducer').default);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
