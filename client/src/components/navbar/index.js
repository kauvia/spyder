import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
				<div className="container">
					<nav className="navbar navbar-expand-lg navbar-light">
						<a className="nav-item nav-link" href="/">
							<FontAwesomeIcon
								icon="home"
								size="2x"
								style={{ color: "blue" }}
							/>
						</a>
						<a className="nav-item nav-link" href="/food">
							<FontAwesomeIcon
								icon="utensils"
								size="2x"
								style={{ color: "blue" }}
							/>
						</a>
						<a className="nav-item nav-link" href="/activity">
							<FontAwesomeIcon
								icon="dumbbell"
								size="2x"
								style={{ color: "blue" }}
							/>
						</a>
						<a className="nav-item nav-link" href="/stats">
							<FontAwesomeIcon
								icon="user-circle"
								size="2x"
								style={{ color: "blue" }}
							/>
						</a>
						<a className="nav-item nav-link" onClick={this.handleLogout}>
							<FontAwesomeIcon
								icon="sign-out-alt"
								size="2x"
								style={{ color: "blue" }}
							/>
						</a>
					</nav>
				</div>
			);
		}
	}
}

export default Navbar;
