import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../functions";
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = { doRedirect: false };
		this.handleLogout = this.handleLogout.bind(this);
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
				<div className="container sticky-top navbar-expand-lg navbar-light bg-light">
					<nav className="navbar">
						<NavLink to="/">
							<FontAwesomeIcon
								icon="home"
								size="2x"
								style={{ color: "blue" }}
							/>
						</NavLink>

						<NavLink to="/food">
							<FontAwesomeIcon
								icon="utensils"
								size="2x"
								style={{ color: "blue" }}
							/>
						</NavLink>
						<NavLink to="/activity">
							<FontAwesomeIcon
								icon="dumbbell"
								size="2x"
								style={{ color: "blue" }}
							/>
						</NavLink>
						<NavLink to="/stats">
							<FontAwesomeIcon
								icon="user-circle"
								size="2x"
								style={{ color: "blue" }}
							/>
						</NavLink>
						<div className="nav-item nav-link" onClick={this.handleLogout}>
							<FontAwesomeIcon
								icon="sign-out-alt"
								size="2x"
								style={{ color: "green" }}
							/>
						</div>
					</nav>
				</div>
			);
		}
	}
}

export default Navbar;
