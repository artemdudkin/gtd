import React, { Component }   from 'react';
import autobind               from 'autobind-decorator';

import {
	Button,
	Modal
} from 'react-bootstrap';

import BlockError from '../block-error';

@autobind
export default class WndError extends Component {

	render() {
		const { onClose, title, error } = this.props;

		return (
				<Modal show={true} onHide={onClose}>
					<Modal.Header closeButton>
						<Modal.Title>{title}</Modal.Title>
					</Modal.Header>
						<BlockError error={error} />
					<Modal.Body>
						
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="primary" onClick={onClose}>Close</Button>
					</Modal.Footer>
				</Modal>
		);
	}
}
