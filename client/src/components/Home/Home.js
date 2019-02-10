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
				<div
					className="background"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: -1,
						backgroundImage: `url(./assets/splash.jpg)`,
						backgroundSize: "cover"
					}}
				/>
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
