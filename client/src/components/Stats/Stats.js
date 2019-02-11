import React, { Component } from "react";
import { api } from "../functions";
import AllowanceContainer from "../Allowance-Container/AllowanceContainer";
import EditStats from "./EditStats";
import Navbar from "../navbar";

class Stats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allowance: { exercise: [], food: [], stat: [] },
			showEditForm: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.updateFromDb();
	}

	updateFromDb() {
		api("GET", "allowance").then(val => {
			if (val.data.success === false) {
				return;
			} else {
				this.setState({ allowance: val.data });
			}
		});
	}
	handleClick(e) {
		this.setState({ showEditForm: true });
	}

	render() {
		if (this.state.allowance.stat.length > 0) {
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
					{/* <Navbar /> */}
					<AllowanceContainer data={this.state.allowance} />
					<b>Height</b>: {this.state.allowance.stat[0].height}cm
					<br />
					<b>Weight</b>: {this.state.allowance.stat[0].weight}kg
					<br />
					<b>Target Weight</b>: {this.state.allowance.stat[0].target_weight}kg
					<br />
					<b>Activity Level</b>: {this.state.allowance.stat[0].activity_level}
					<br />


					{/* <button onClick={this.handleClick}>Edit Stats</button>
					{this.state.showEditForm && (
						<EditStats statHistory={this.state.allowance.stat[0]} />
					)} */}

							<button
								type="button"
								class="btn btn-primary"
								data-toggle="modal"
								data-target="#exampleModalLong"
							>
								Update
							</button>
							<div
								class="modal fade"
								id="exampleModalLong"
								tabindex="-1"
								role="dialog"
								aria-labelledby="exampleModalLongTitle"
								aria-hidden="true"
							>
								<div class="modal-dialog" role="document">
									<div class="modal-content">
										<div class="modal-header">
											<h5 class="modal-title" id="exampleModalLongTitle">
												Update your stats:
											</h5>
											<button
												type="button"
												class="close"
												data-dismiss="modal"
												aria-label="Close"
											>
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div class="modal-body">
											<EditStats statHistory={this.state.allowance.stat[0]}/>
										</div>
									</div>
								</div>
							</div>




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
							// backgroundImage: `url(./assets/splash.jpg)`,
							backgroundSize: "cover"
						}}
					/>
					{/* <Navbar /> */}
					<AllowanceContainer />
					<header style={{ border: "2px solid black" }} />
					Loading stats...
				</div>
			);
		}
	}
}

export default Stats;
