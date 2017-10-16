import React, { Component }   from 'react';
import autobind               from 'autobind-decorator';

import {
	Alert, 
} from 'react-bootstrap';

@autobind
export default class BlockError extends Component {

	render() {
		const { title, unknownErrorMessage="Unknown error" } = this.props;

		let { error } = this.props;
		if (error instanceof Error) {
			error = error.toString();
		} else {
			error = JSON.stringify(error.resultDescription || unknownErrorMessage)
		}
		if (("" + error).length > 1024) error = ("" + error).substring(0, 1024) + "...";

		return (
			<Alert bsStyle="danger">{error}</Alert>
		);
	}
}
