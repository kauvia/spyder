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
	componentDidMount() {
		// create today's date (save to redux store)
		let today = new Date()
		let date = ''
		let month = ''
		if(today.getMonth().toString().length === 1){date = `0${today.getMonth().toString()}`}
		if(today.getDate().toString().length === 1){month = `0${today.getDate().toString()}`}
		let dateToday = `${today.getFullYear().toString()}-${month}-${date}`

		// axios init package
		axios.get("/test",{headers:{Authorization : `${localStorage.getItem("token")}`}})
		.then(res => {
			this.props.redux(1, res.data)
			this.props.redux(2, dateToday)
		})
	}
	componentDidUpdate(){
		// console.log(this.props.store)
	}
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
				case 2:
					dispatch({ type: "ADD_DATE", data });
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
