import React, { Component }   from 'react';
import autobind               from 'autobind-decorator';

import {
	Checkbox
} from 'react-bootstrap';

@autobind
export default class Checkbox2 extends Component {
	onChange(){
		const { id, value, onChange=()=>{} } = this.props;
		onChange({target:{id, value:!value}});
	}
	render(){
		const { id, value, disabled, style } = this.props;
		return (
				<Checkbox style={style} id={id} checked={value} disabled={disabled} onChange={this.onChange}>
					{this.props.children}
				</Checkbox>
		)
	}
}