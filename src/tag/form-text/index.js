import React, { Component }   from 'react';

import './styles.css';

export default class FormText extends Component {
	render(){
		const { value, bold, className, style } = this.props;
		return (
				<span className={"FormText " + (bold?"FormText__bold":"") + " " + className} style={style}>{value}</span>
		)
	}
}