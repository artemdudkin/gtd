import React, { Component } from 'react';

import './styles.css';

export default class NamedGroup extends Component {
	render() {
		const { name } = this.props;
		return (
			<fieldset className="well NamedGroup__fieldset">
				<legend className="NamedGroup__legend">{name}</legend>
				{this.props.children}
			</fieldset>
		);
	}
}