import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import axios from "axios";

import Home from "./components/Home/Home";
import Activity from "./components/Activity/Activity";
import Food from "./components/Food/Food";
import Stats from "./components/Stats/Stats";

class Application extends Component {
	componentDidMount() {}
	render() {
		return (
			<div id="application">
				<header>
					<ul>
						<li>
							<NavLink to={`/`}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to={`/food`}>
								Food
							</NavLink>
						</li>
						<li>
							<NavLink to={`/activity`}>
								ACTIVITY
							</NavLink>
						</li>
						<li>
							<NavLink to={`/stats`}>
								stats
							</NavLink>
						</li>
					</ul>
				</header>
				<Switch>
					<Route
						exact
						path={`/`}
						component={Home}
					/>
					<Route
						path={`/food`}
						component={Food}
					/>
					<Route
						path={`/activity`}
						component={Activity}
					/>
					<Route
						path={`/stats`}
						component={Stats}
					/>
				</Switch>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		store: state
	};
};
const mapDispatchToProps = dispatch => {
	return {
		redux: (key, data) => {
			switch (key) {
				case 1:
					dispatch({ type: "ADD_PACKAGE", data });
					break;

				default:
					break;
			}
		}
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Application);
