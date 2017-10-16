import React, { Component } from 'react';
import autobind             from 'autobind-decorator';
import moment               from 'moment';
import ReactDatePicker      from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css'; //эта фигня из-за того, что календарь показвывается слишком маленький [https://github.com/Hacker0x01/react-datepicker/issues/624]

import {
	Button,
	InputGroup,
	FormControl,
        Glyphicon
} from 'react-bootstrap';

//Вся эта штука возникла исключительно по двум причинам
//1. datepicker должен вызывать onChange с параметрами {target:{id, value}}
//2. datepicker должен позволять пустые значения (react-datepicker этого не делает, и это 90% геморроя)
//	[хотя на самом деле умеет, и весь геморрой из-за того, что показываем customInput]
//	[а зачем мы показываем customInput? вроде как длч красоты 8-E ]

@autobind
class DI extends Component {
	constructor(props){
		super(props);
		this.state = this.processProps(props); //{val}
	}

	componentWillReceiveProps(nextProps) {
		//не воспринимаем изменения props когда focused - типа, мы редактируем
		if (!this.state.focused) { 
			this.setState(this.processProps(nextProps));
		}
	}

	processProps(props){
		const { via={} } = props;
		const { id, value } = via;
		const val = moment(value).isValid() ? moment(value).format("L") : value;
		return {
			val : val
		}
	}
	
	onBlur() {
		//после окончания редактирования - синхронизируем с текущим значением datepicker
		this.setState({
		        focused : false,
			...this.processProps(this.props)
		});
	}

	onFocus() {
		this.setState({focused:true});
	}
	
	onChange(event){
		const { target={} } = event;
		const { value:val } = target;
		this.setState({val});

		//если дата ок - вызываем родительский onChange
		if (moment(val).isValid()) {
			const { via={} } = this.props;
			const { id, onChange } = via;
			onChange({target:{id:id, value:moment(val).format()}});
		}

		//если очистили дату - вызываем родительский onChange
		if (!val) {
			const { via={} } = this.props;
			const { id, onChange } = via;
			onChange({target:{id:id, value:""}});
		}
	}
	
	render () {
		const { val } = this.state;

		const { via={}, onClick } = this.props;
		const { id, disabled } = via;
		return (
			<InputGroup>
				<FormControl id={id} type="text" disabled={disabled} value={val} onClick={onClick} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur}/>
				<InputGroup.Button>
					<Button onClick={onClick}><Glyphicon glyph="calendar"/></Button>
				</InputGroup.Button>
			</InputGroup>
		)
	}
}

//DI.propTypes = {
//	onClick: React.PropTypes.func,
//	value: React.PropTypes.string
//}

@autobind
export default class DatePicker extends Component {
	onChange(value){
		const { onChange, id } = this.props;
		onChange({target:{id, value:value.format()}});
	}
	render(){
		const { id, value, disabled, onChange} = this.props;
		const datepicker_value = moment(value).isValid() ? moment(value) : moment();

		const input = <DI via={{id, disabled, value, onChange}}/> 
		
		return (
			//openToDate нужен, когда datepicker открыт и дата поменялась, чтобы он перерисовался с новой датой
			<ReactDatePicker 
				tetherConstraints={ [] } 
				customInput={input} 
				todayButton="Today" 
				selected={datepicker_value} 
				openToDate={datepicker_value} 
				onChange={this.onChange} />
		)
	}
}