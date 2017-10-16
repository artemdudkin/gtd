import React from "react"
import { connect } from 'react-redux';
import {Route} from "react-router-dom"
import history from '../../module/history';

class AuthenticatedRoute extends React.Component {
	render() {
		const {session} = this.props;
		if (!session) {
			history.push('/login');
			return null
		}
		return <Route {...this.props} />
	}
}

const mapStateToProps = state => ({
	session: state.session.name
});

export default connect(mapStateToProps)(AuthenticatedRoute);
