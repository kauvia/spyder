import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
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
			userData: { food: null, exercise: null, stat: null },
			loading: false,
		};
	}
	componentDidMount() {
		api("GET", "/users/validate").then(res => {
			if (!res.data.success) {
				this.setState({ doRedirect: true });
				localStorage.clear();
			} else {
				api("GET", "/test").then(res => {
					this.setState({ userData: res.data });
				});
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

	render() {
		return (
			<div id="main">
				<div className="container" style={{maxWidth:"1000px"}}>
					<Switch>
						<Route exact path={`/`} component={Home} />
						<Route path={`/food`} render={props => <Food {...props} />} />
						<Route path={`/activity`} component={Activity} />
						<Route path={`/stats`} render={props => <Stats {...props} />} />
					</Switch>
				</div>
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
)(Main);
