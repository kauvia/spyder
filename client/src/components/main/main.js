import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { api } from "../functions";
import axios from "axios";

import Home from "../Home/Home";
import Activity from "../Activity/Activity";
import Food from "../Food/Food";
import Stats from "../Stats/Stats";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {food:null,exercise:null,stat:null},
			doRedirect: false,
			loading: false
		};
		this.handleLogout = this.handleLogout.bind(this);
	}
	componentDidMount() {
		api("GET", "/users/validate").then(res => {
			if (!res.data.success) {
				this.setState({ doRedirect: true });
				localStorage.clear();
			} else {
				api("GET","/test").then(res=>{
					this.setState({userData:res.data})
				})
			}
		});
		// create today's date (save to redux store)
		let today = new Date();
		let date = "";
		let month = "";
		if (today.getMonth().toString().length === 1) {
			date = `0${today.getMonth().toString()}`;
		}
		if (today.getDate().toString().length === 1) {
			month = `0${today.getDate().toString()}`;
		}
		let dateToday = `${today.getFullYear().toString()}-${month}-${date}`;

		// axios init package
		axios
			.get("/test", {
				headers: { Authorization: `${localStorage.getItem("token")}` }
			})
			.then(res => {
				this.props.redux(1, res.data);
				this.props.redux(2, dateToday);
			});
	}

	handleLogout() {
		api("DELETE", "users/sign_out").then(res => {
			if (res.status === 204) {
				localStorage.clear();
				this.setState({ doRedirect: true });
			}
		});
	}

	render() {
		if (this.state.doRedirect) {
			return <Redirect to="/login" />;
		} else {
			return (
				<div id="main">
					<button onClick={this.handleLogout}>Log out</button>
					<header>
						<ul>
							<li>
								<NavLink to={`/`}>Home</NavLink>
							</li>
							<li>
								<NavLink to={`/food`}>Food</NavLink>
							</li>
							<li>
								<NavLink to={`/activity`}>ACTIVITY</NavLink>
							</li>
							<li>
								<NavLink to={`/stats`}>stats</NavLink>
							</li>
						</ul>
					</header>
					<Switch>
						<Route exact path={`/`} component={Home} />
						<Route path={`/food`} render={props => <Food foodHistory={this.state.userData.food} {...props}/>} />
						<Route path={`/activity`} component={Activity} />
						<Route path={`/stats`} render={props => <Stats statHistory={this.state.userData.stat} {...props}/>} />
					</Switch>
				</div>
			);
		}
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
)(Main);
