import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Main from "./components/main/main";
import Login from "./components/login/Login";
import Particles from "./components/particles";
import "./App.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faHome,
	faDumbbell,
	faUserCircle,
	faUtensils,
	faSignOutAlt,
	faSignInAlt,
	faPlus,
	faPlusCircle,
	faMinus,
	faEquals,
	faExclamationTriangle,
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faCalendarAlt,
	faTrashAlt,
	faTimesCircle,
	faCaretDown,
	faCaretUp
} from "@fortawesome/free-solid-svg-icons";

library.add(
	faDumbbell,
	faHome,
	faSignInAlt,
	faSignOutAlt,
	faUtensils,
	faUserCircle,
	faPlus,
	faPlusCircle,
	faMinus,
	faEquals,
	faExclamationTriangle,
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faCalendarAlt,
	faTrashAlt,
	faTimesCircle,
	faCaretDown,
	faCaretUp

);
class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route path="/" component={Main} />
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		store: state
	};
};
export default connect(mapStateToProps)(App);
