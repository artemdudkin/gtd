import React    from 'react';
import autobind from 'autobind-decorator';
import lodash   from 'lodash';

import { FormControl } from 'react-bootstrap';

import Text       from '../form-text';
import DatePicker from '../form-datepicker';
import Checkbox   from '../form-checkbox';

import './styles.css';

@autobind
export default class UniControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
	const { editable=false, value='', type='text', id='', options=[], onChange=()=>{} } = this.props;
    
    	if (editable) {
		if (type == 'boolean') {
			return <Checkbox id={id} value={value} onChange={onChange}></Checkbox>
		}
		if (type == 'date') {
			return <DatePicker id={id} value={value} onChange={onChange}/>
		}
		if (type == 'select') {
			return <FormControl componentClass="select" value={value} onChange={onChange}>
				{options.map(_itm=>{
					return <option value={_itm.name}>{_itm.label}</option>
				})}
			</FormControl>
		}

    		return <FormControl type="text" value={value} onChange={onChange} autoComplete="off"/>
    	} else {
		return <Text id={id} value={""+value} />    	
    	}
    }
}


