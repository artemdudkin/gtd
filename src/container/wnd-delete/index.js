import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import autobind               from 'autobind-decorator';
import { injectAsyncReducer } from '../../store';

import {
    hide,
} from './_actions';

import {
	Modal,
	Button,
	FormGroup,
	Col,
	ControlLabel,
	Form,
	FormControl,
        Glyphicon
} from 'react-bootstrap';

import Text from '../../tag/form-text';
import Wait from '../../tag/wait';

import './styles.css';

@autobind
class WndDelete extends Component {

	clickClose(){
		this.props.hide();
	}

	render() {
		const { onOk, name } = this.props;
		const { state } = this.props;
		const { locked, visible } = state;

		if (!visible) {
			return null;
		} else {
		return (
			<Modal show={true} onHide={this.clickClose}>
				{locked && <Wait />}
				<Modal.Header closeButton>
					<Modal.Title>Delete {name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form horizontal>
						<FormGroup>
							<Text className="wnd-delete__m20" value={"Are you sure you want to delete this "+name+"?"}/>
						</FormGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.clickClose}>Close</Button>
					<Button bsStyle="primary" onClick={onOk}>Ok</Button>
				</Modal.Footer>
			</Modal>
		)}
	}
}

const mapStateToProps = state => ({
    state      : state.wndDelete,
});

const mapDispatchToProps = {
    hide,
}

injectAsyncReducer('wndDelete', require('./_reducer').default);

export default connect(mapStateToProps, mapDispatchToProps)(WndDelete);
