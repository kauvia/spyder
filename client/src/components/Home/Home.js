import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../navbar";
import AllowanceContainer from "../Allowance-Container/AllowanceContainer";
import { api } from "../functions";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allowance: null
		};
	}

	componentDidMount() {
		this.updateFromDb();
	}
	updateFromDb() {
		api("GET", "allowance").then(val => {
			this.setState({ allowance: val.data });
		});
	}
	render() {
		return (
			<div id="home">
				<Navbar />
				<AllowanceContainer data={this.state.allowance} />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		store: state
	};
};
export default connect(mapStateToProps)(Home);
