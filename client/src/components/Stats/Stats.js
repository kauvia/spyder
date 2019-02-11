import React, { Component } from "react";
import { api } from "../functions";
import AllowanceContainer from "../Allowance-Container/AllowanceContainer";
import EditStats from "./EditStats";
import Navbar from "../navbar";

class Stats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allowance: {},
			showEditForm: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.updateFromDb();
	}
	
	updateFromDb() {
		api("GET", "allowance").then(val => {
			this.setState({ allowance: val.data });
		});
	}
	handleClick(e) {
		this.setState({ showEditForm: true });
	}

	render() {
		if (Object.keys(this.state.allowance).length > 0) {
			return (
				<div>
					<div
						className="background"
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							zIndex: -1,
							// backgroundImage: `url(./assets/splash.jpg)`,
							backgroundSize: "cover"
						}}
					/>
					
					<Navbar />
					<AllowanceContainer data={this.state.allowance} />
					
					Height: {this.state.allowance.stat[0].height}cm
					<br />
					Weight: {this.state.allowance.stat[0].weight}kg
					<br />
					Target Weight: {this.state.allowance.stat[0].target_weight}kg
					<br />
					Activity Level: {this.state.allowance.stat[0].activity_level}
					<br />
					<button onClick={this.handleClick}>Edit Stats</button>
					{this.state.showEditForm && (
						<EditStats statHistory={this.state.allowance.stat[0]} />
					)}
				</div>
			);
		} else {
			return (
				<div>
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
					<AllowanceContainer />
					<Navbar />

					<header style={{ border: "2px solid black" }} />
					Loading stats...
				</div>
			);
		}
	}
}

export default Stats;
