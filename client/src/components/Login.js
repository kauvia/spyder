import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
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
		this.testAuth = this.testAuth.bind(this);
	}
	testAuth(e) {
		axios.get("/test",{headers:{Authorization : `${localStorage.getItem("token")}`}}).then(res => console.log(res));
	
	}
	testLogout = e => {
		localStorage.clear();
		axios.delete("/users/sign_out").then(res => console.log(res));
	};

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
		console.log(this.state);
	}
	dbCreateUser() {
		fetch("/users", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user: { username: "tesadd", password: "password" }
			})
		}).then(res => {
			res.headers.forEach(console.log);
			res.json().then(res => {
				console.log(res);
				// if (res.success) {
				// 	localStorage.setItem("isLoggedIn", "true");
				// 	localStorage.setItem("token", res.token);
				// 	this.setState({ isLoggedIn: true });
				// } else {
				// 	this.setState({ message: res.message });
				// }
			});
		});
	}
	dbLogIn() {
		axios
			.post("users/sign_in", { user: { username: "a", password: "password" } })
			.then(res => {
				console.log(res);

				if (res.status === 200) {
					localStorage.setItem("isLoggedIn", "true");
					localStorage.setItem("token", res.headers.authorization);
					 this.setState({ isLoggedIn: true });
				} else {
					this.setState({ message: "wrong username or password" });
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
					<button onClick={this.testLogout}>TESTING LOGOUT</button>

					<button onClick={this.testAuth}>TESTING FOR AUTH</button>
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
