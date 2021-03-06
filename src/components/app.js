import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import RegistrationForm from './registration-form';
import {fetchCurrentUser, setLoggedIn} from '../actions';

export class App extends React.Component {
    componentDidMount() {
        if (this.props.hasCredentials) {
            // Check that the credentials are right by accessing the endpoint
            this.props.dispatch(fetchCurrentUser()).then(() =>
                this.props.dispatch(setLoggedIn(true))
            );
        }
    }
    render() {
        return (
            <div className="app">
                <HeaderBar />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/register" component={RegistrationForm} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasCredentials: (
        state.currentUser.username !== undefined &&
        state.currentUser.password !== undefined
    )
});

export default compose(
    withRouter,
    connect(mapStateToProps)
)(App);
