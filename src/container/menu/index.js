import React from 'react';
import { connect } from 'react-redux';
import autobind    from 'autobind-decorator';
import version     from '../../module/version';
import { injectAsyncReducer } from '../../store';

import {
	Nav,
	Navbar,
	NavItem,
} from 'react-bootstrap';

import {
    logout
} from './_actions';

import './styles.css';


if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}


@autobind
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render() {
	const { menu } = this.props;
	const { logout } = this.props;

	const second_part = window.location.href.split('#/')[1] || window.location.href;
	const uri = second_part.split('?')[0];
//	const uri  = normalized_second_part.split('/')[0];

	const activeKey = menu.filter(_itm=>{
//		return (window.location.href.indexOf(_itm.href) != -1)
		return (uri == _itm.href.replace('#/',''))
	})
	.map(_itm=>{
		return _itm.name
	})[0];

	return (
	 <div>
		<Navbar>
		<Navbar.Header>
			<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
			<Nav bsStyle="pills" activeKey={activeKey}>
				{menu.map(_itm => {
					return <NavItem 
						key={"menu-item-"+_itm.name} 
						eventKey={_itm.name} 
						href={_itm.href}
						>
							{_itm.label}
						</NavItem>
				})}
			</Nav>
			<Nav pullRight>	
				<NavItem disabled={true} key={"version"} >{"v." + version}</NavItem>
				<NavItem key={"menu-item-logout"} eventKey="logout" onClick={logout}>Logout</NavItem>
			</Nav>
		</Navbar.Collapse>
		</Navbar>
	 </div>
        )
   }
}

const mapStateToProps = state => ({
    menu : state.menu,
});

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
