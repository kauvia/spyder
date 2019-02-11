import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { api } from "../functions";
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			message: "",
			isNewAccount: false,
			isLoggedIn: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		if (localStorage.length >0 ){
		api("GET", "/users/validate").then(res => {
			if (res.data.success){
				this.setState({ isLoggedIn: true });
			} else {
				localStorage.clear()
			}
		});}
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.isNewAccount) {
			if (this.state.password.length < 8) {
				this.setState({
					message: "Password needs to be at least 8 characters."
				});
			} else {
				this.dbCreateUser();
			}
		} else {
			this.dbLogIn();
		}
	}
	handleChange(e) {
		let target = e.target;
		if ("username" === target.name) {
			this.setState({ [target.name]: target.value });
		} else if ("password" === target.name) {
			this.setState({ [target.name]: target.value });
		} else if ("isNewAccount" === target.name) {
			this.setState({ [target.name]: target.checked });
		}
	}
	dbCreateUser() {
		api(
			"POST",
			"users",
			{
				user: { username: this.state.username, password: this.state.password }
			},
			false
		).then(val => {
			if (val.status === 200) {
				api(
					"POST",
					"users/sign_in",
					{
						user: {
							username: this.state.username,
							password: this.state.password
						}
					},
					false
				).then(val => {
					if (val.status === 200) {
						localStorage.setItem("isLoggedIn", "true");
						localStorage.setItem("token", val.headers.authorization);
						this.setState({ isLoggedIn: true });
					}
				});
			} else {
				this.setState({
					message: "Sorry. Invalid username or password. Please try again."
				});
			}
		});
	}
	dbLogIn() {
		api(
			"POST",
			"users/sign_in",
			{
				user: {
					username: this.state.username,
					password: this.state.password
				}
			},
			false
		).then(val => {
			if (val.status === 200) {
				localStorage.setItem("isLoggedIn", "true");
				localStorage.setItem("token", val.headers.authorization);
				this.setState({ isLoggedIn: true });
			} else {
				this.setState({
					message: "Sorry. Invalid username or password. Please try again."
				});
			}
		});
	}
	render() {
		if (this.state.isLoggedIn) {
			return <Redirect to="/" />;
		} else {
			return (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{ height: 100 + "vh" }}
				>
					<form
						onSubmit={this.handleSubmit}
						onChange={this.handleChange}
						style={{ width: 250 + "px" }}
					>
						<div className="form-group">
							<label htmlFor="inputUsername">Username</label>
							<input
								name="username"
								type="text"
								className="form-control"
								id="inputUsername"
								placeholder="Enter username"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="inputPassword">Password</label>
							<input
								name="password"
								type="password"
								className="form-control"
								id="inputPassword"
								placeholder="Enter password"
							/>
						</div>
						<div className="form-check">
							<input
								name="isNewAccount"
								type="checkbox"
								className="form-check-input"
								id="checkNewAccount"
								defaultChecked={this.state.isNewAccount}
							/>
							<label className="form-check-label" htmlFor="checkNewAccount">
								New User
							</label>
						</div>
						<button type="submit" value="Submit" className="btn btn-primary">
							Submit
						</button>
						<div style={{ fontSize: 12 + "px", height: 15 + "px" }}>
							{this.state.message}
						</div>
					</form>
				</div>
			);
		}
	}
}
export default Login;
