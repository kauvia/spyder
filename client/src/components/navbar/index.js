import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../functions";
import Logo from "../../logo-trbg.png";

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
				// <div className="container sticky-top navbar-expand-lg navbar-light bg-light">
				// 	<nav className="navbar">
				// 		<NavLink to="/">
				// 			<FontAwesomeIcon
				// 				icon="home"
				// 				size="2x"
				// 				style={{ color: "blue" }}
				// 			/>
				// 		</NavLink>

				// 		<NavLink to="/food">
				// 			<FontAwesomeIcon
				// 				icon="utensils"
				// 				size="2x"
				// 				style={{ color: "blue" }}
				// 			/>
				// 		</NavLink>
				// 		<NavLink to="/activity">
				// 			<FontAwesomeIcon
				// 				icon="dumbbell"
				// 				size="2x"
				// 				style={{ color: "blue" }}
				// 			/>
				// 		</NavLink>
				// 		<NavLink to="/stats">
				// 			<FontAwesomeIcon
				// 				icon="user-circle"
				// 				size="2x"
				// 				style={{ color: "blue" }}
				// 			/>
				// 		</NavLink>
				// 		<div className="nav-item nav-link" onClick={this.handleLogout}>
				// 			<FontAwesomeIcon
				// 				icon="sign-out-alt"
				// 				size="2x"

				// 				style={{ color: "green" }}

				// 			/>
				// 		</div>
				// 	</nav>
				// </div>





				<nav class="navbar navbar-expand-sm navbar-light sticky-top bg-light">
					<NavLink class="navbar-brand" to="/">
						<img src={Logo} style={{width:"50px", height:"50px"}} alt="" />
					</NavLink>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					
							<ul class="navbar-nav mr-auto">
								<li class="nav-item active">
									<NavLink class="nav-link" to="/">Home <span class="sr-only">(current)</span></NavLink>
								</li>
								<li class="nav-item">
									<NavLink class="nav-link" to="/food">Food</NavLink>
								</li>
								<li class="nav-item">
									<NavLink class="nav-link" to="/activity">Exercises</NavLink>
								</li>
							</ul>
					

						<ul className="navbar-nav ml-auto">
							<li class="nav-item nav-link">
								<NavLink class="nav-link" to="/stats">My Profile</NavLink>
							</li>
							<li className="nav-item nav-link" onClick={this.handleLogout}>
								<a class="nav-link">Logout</a>
							</li>
    					</ul>

					</div>
				</nav>


			);
		}
	}
}

export default Navbar;
