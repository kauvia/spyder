import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { api } from "../functions";
import { Calendar } from "react-calendar";
import ActivityHistory from "./ActivityHistory";
import Navbar from "../navbar";
import AllowanceContainer from "../Allowance-Container/AllowanceContainer";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Activity extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allowance: null,
			exerciseHistory: null,
			results: [],
			exerciseArr: [],
			selectedDateArr: [],
			selectedDate: `${moment(new Date())
				.startOf("day")
				.format()}`,
			displayCalendar: false,
			displaySearch: false,

			activity: {
				name: "",
				repsDuration: "",
				calories_burnt: "",
				reps: false,
				disable: false,
				useModel: false,
				selectModel: false
			},
			model: {},
			form: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.models = this.models.bind(this);
		this.form = this.form.bind(this);
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
		api("GET", "exercises").then(val => {
			if (val.data.success === false) {
				return;
			} else {
				this.setState({ exerciseHistory: val.data.exercise });
				this.sortExerciseHistory();
				this.updateSelectedDateHistory(this.state.selectedDate);
			}
		});
	}
	deleteExerciseItem = e => {
		api("DELETE", "/exercises", { id: e }).then(val => {
			this.updateFromDb();
		});
		console.log(e);
	};
	sortExerciseHistory() {
		let history = this.state.exerciseHistory;
		let dayCounter = 0;
		let dayArray = [];
		let innerArray = [];
		let currentDate = new Date();
		currentDate = moment(currentDate).startOf("day");

		for (let i = 0; i < history.length; i++) {
			let tempDate = moment(history[i].created_at).startOf("day");
			if (dayCounter === currentDate.diff(tempDate, "days")) {
				innerArray.push(history[i]);
			} else {
				dayArray.push(innerArray);
				innerArray = [];
				dayCounter = currentDate.diff(tempDate, "days");
				innerArray.push(history[i]);
			}
			if (i === history.length - 1) {
				if (innerArray.length > 0) {
					dayArray.push(innerArray);
				}
			}
		}
		this.setState({ exerciseArr: dayArray });
	}
	updateSelectedDateHistory(val) {
		let tempArr = [];
		let selectedDate = moment(val).startOf("day");
		let exerciseArr = this.state.exerciseArr;
		for (let item in exerciseArr) {
			if (exerciseArr[item].length > 0) {
				let tempDate = moment(exerciseArr[item][0].created_at).startOf("day");
				if (selectedDate.diff(tempDate, "days") === 0) {
					tempArr = exerciseArr[item];
				}
			}
		}
		this.setState({ selectedDateArr: tempArr });
	}
	handleChange(e) {
		switch (e.target.name) {
			case "name":
				this.setState({
					...this.state,
					activity: {
						...this.state.activity,
						name: e.target.value
					}
				});
				break;
			case "repsDuration":
				if (
					this.state.model !== undefined &&
					this.state.activity.useModel === true
				) {
					let rd = e.target.value;
					let cal =
						parseInt(rd) * parseFloat(this.state.model.calories_burnt_perunit);
					this.setState({
						...this.state,
						activity: {
							...this.state.activity,
							repsDuration: rd,
							calories_burnt: cal
						}
					});
				} else {
					this.setState({
						...this.state,
						activity: {
							...this.state.activity,
							repsDuration: e.target.value
						}
					});
				}
				break;
			case "calories_burnt":
				this.setState({
					...this.state,
					activity: {
						...this.state.activity,
						calories_burnt: e.target.value
					}
				});
				break;
			case "reps":
				if (this.state.activity.disable === "readonly") {
				} else {
					this.setState({
						...this.state,
						activity: {
							...this.state.activity,
							reps: e.target.checked
						}
					});
				}
				break;
			case "useModel":
				if (e.target.checked === true) {
					this.setState({
						...this.state,
						activity: {
							...this.state.activity,
							useModel: true,
							disable: "readonly",
							selectModel: true
						}
					});
				} else if (e.target.checked === false) {
					this.setState({
						...this.state,
						activity: {
							...this.state.activity,
							useModel: false,
							disable: false,
							selectModel: false
						}
					});
				}

				break;
			case "selectModel":
				if (this.state.activity.selectModel) {
					this.setState({
						...this.state,
						activity: {
							...this.state.activity,
							selectModel: false
						}
					});
				} else {
					this.setState({
						...this.state,
						activity: {
							...this.state.activity,
							selectModel: true,
							useModel: true,
							disable: "readonly"
						}
					});
				}
				break;
			case "model":
				let model = this.props.store.food_exercise_models.exercise[
					e.target.value
				];
				let reps = model.reps;
				this.setState({
					...this.state,
					activity: {
						...this.state.activity,
						selectModel: false,
						name: model.name,
						repsDuration: 1,
						calories_burnt: model.calories_burnt_perunit,
						reps: reps
					},
					model: model
				});
				break;
			case "form":
				if (this.state.form) {
					this.setState({ ...this.state, form: false });
				} else {
					this.setState({ ...this.state, form: true });
				}
				break;
			default:
				break;
		}
	}
	handleClick = e => {
		let target = e.target;
		if ("arrowBack" === target.dataset.id) {
			let newDate = moment(this.state.selectedDate)
				.subtract(1, "days")
				.format();
			this.setState({ selectedDate: newDate });
			this.updateSelectedDateHistory(newDate);
		}
		if ("arrowNext" === target.dataset.id) {
			let newDate = moment(this.state.selectedDate)
				.add(1, "days")
				.format();
			this.setState({ selectedDate: newDate });
			this.updateSelectedDateHistory(newDate);
		}
		if ("search" === target.dataset.id) {
			this.state.form
				? this.setState({ form: false, results: [] })
				: this.setState({ form: true });
		}
		if ("toggleCalendar" === target.dataset.id) {
			this.state.displayCalendar
				? this.setState({ displayCalendar: false })
				: this.setState({ displayCalendar: true });
		}
	};
	handleCalendar = e => {
		this.setState({ selectedDate: `${e}` });
		let tempArr = [];
		let selectedDate = moment(e).startOf("day");
		let exerciseArr = this.state.exerciseArr;
		for (let item in exerciseArr) {
			if (exerciseArr[item].length > 0) {
				let tempDate = moment(exerciseArr[item][0].created_at).startOf("day");
				if (selectedDate.diff(tempDate, "days") === 0) {
					tempArr = exerciseArr[item];
				}
			}
		}
		this.setState({ selectedDateArr: tempArr });
		this.setState({ displayCalendar: false });
	};
	handleSubmit(e) {
		e.preventDefault();
		switch (e.target.id) {
			case "newActivityForm":
				let number = this.state.activity.repsDuration;
				let rORd = this.state.activity.reps;
				let reps;
				let duration;
				if (rORd) {
					reps = number;
					duration = null;
				} else {
					duration = number;
					reps = null;
				}
				let activityNew = {
					name: name,
					reps: reps,
					duration: duration,
					calories: cal
				};
				let cal = this.state.activity.calories_burnt;
				let name = this.state.activity.name;
				if (
					Number.isInteger(parseInt(number)) &&
					Number.isInteger(parseInt(cal))
				) {
					// NOT DONE! work on the response... need to include
					// created_at (change to moment object)/ calories_burnt / duration / reps / id / name / user_id
					axios.post("/exercises/new", activityNew).then(res => {
						this.props.redux(1, res);
					});
					this.setState({
						...this.state,
						activity: {
							...this.state.activity,
							name: "",
							repsDuration: "",
							calories_burnt: "",
							reps: false,
							disable: false,
							useModel: false,
							selectModel: false
						},
						model: {}
					});
				}
				break;
			default:
				break;
		}
	}
	models() {
		if (this.state.activity.selectModel) {
			return this.props.store.food_exercise_models.exercise.map((ele, num) => {
				return (
					<button
						name="model"
						value={num}
						key={ele.name}
						onClick={this.handleChange}
					>
						{ele.name}
					</button>
				);
			});
		}
	}
	form() {
		if (this.state.form) {
			return (
				<div className="container" style={{}}>
					{/* ==========================================
                                NEW ACTIVITY FORM
                ========================================== */}
					<form id="newActivityForm" onSubmit={this.handleSubmit}>
						{/* input fields */}
						<input
							className={this.state.activity.disable.toString()}
							readOnly={this.state.activity.disable}
							type="text"
							name="name"
							autoComplete="off"
							onChange={this.handleChange}
							value={this.state.activity.name}
						/>
						<label>Activity</label>
						<br />

						<input
							type="text"
							name="repsDuration"
							onChange={this.handleChange}
							value={this.state.activity.repsDuration}
							autoComplete="off"
						/>
						<label>Reps / Duration (mins)</label>
						<br />

						<input
							className={this.state.activity.disable.toString()}
							readOnly={this.state.activity.disable}
							type="text"
							name="calories_burnt"
							autoComplete="off"
							onChange={this.handleChange}
							value={this.state.activity.calories_burnt.toString()}
						/>
						<label>Calories</label>
						<br />
						{/* REPS TOGGLE */}
						<div>
							<label> Reps </label>
							<label className="switch">
								<input
									type="checkbox"
									name="reps"
									onChange={this.handleChange}
									checked={this.state.activity.reps}
								/>
								<span className="slider" />
							</label>{" "}
							<label> Duration </label>
						</div>
						<br />
						{/* SUBMIT BUTTON */}
						<input type="submit" value="SUBMIT" />
					</form>
					{/* MODELS TOGGLE */}
					<label> Use Models </label>
					<label className="switch">
						<input
							type="checkbox"
							name="useModel"
							onChange={this.handleChange}
							checked={this.state.activity.useModel}
						/>
						<span className="slider" />
					</label>
					<br />
					{/* CALL MODEL BUTTONS */}
					<button name="selectModel" onClick={this.handleChange}>
						Choose Another Exercise
					</button>{" "}
					<br />
					{/* ==========================================
                            MODEL BUTTONS
            ========================================== */}
					{this.models()}
				</div>
			);
		}
	}
	render() {
		// {/* ==========================================
		//             ACTIVITY HISTORY // LOADING
		// ========================================== */}
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
						backgroundImage: `url(https://media.gettyimages.com/photos/close-up-of-barbell-weights-on-floor-of-dark-gym-picture-id554370953)`,
						backgroundSize: "cover"
					}}
				/>
			<div id="activity">
				{/* <Navbar /> */}
				<AllowanceContainer data={this.state.allowance} />
				<div id="history-container" className="container">
					{/* ==========================================

                            ACTIVITY HISTORY // RENDER
            ========================================== */}
					<div
						className="row text-center"
						style={{ display: "flex" }}
						onClick={this.handleClick}
					>
						<div className="col-3" data-id="arrowBack">
							<FontAwesomeIcon
								icon="angle-double-left"
								style={{ color: "gray" }}
								size="2x"
								data-id="arrowBack"
							/>
						</div>
						<div
							id="date-navigator"
							className="col-6"
							data-id="toggleCalendar"
							onClick={this.handleClick}
						>
							{moment(this.state.selectedDate).diff(
								moment(new Date()),
								"days"
							) === 0 && "Today"}
							{moment(this.state.selectedDate).diff(
								moment(new Date()),
								"days"
							) !== 0 && `${moment(this.state.selectedDate).format("LL")}`}{" "}
							<FontAwesomeIcon icon="calendar-alt" style={{ color: "gray" }} />
						</div>
						{moment(this.state.selectedDate).diff(
							moment(new Date()),
							"days"
						) !== 0 && (
							<div className="col-3" data-id="arrowNext">
								<FontAwesomeIcon
									icon="angle-double-right"
									style={{ color: "gray" }}
									size="2x"
									data-id="arrowNext"
								/>
							</div>
						)}
						{/* SHOW CALENDAR */}
						{this.state.displayCalendar && (
							<div
								className="row text-center"
								style={{ position: "absolute", zIndex: 1 }}
							>
								<div className="col-12">
									<Calendar
										onChange={this.handleCalendar}
										value={this.state.date}
										maxDate={new Date()}
									/>
								</div>
							</div>
						)}
						{/* SEARCH AND ADD FOOD ITEMS */}

						<div className="container">
							<div className="row">
								<div
									onClick={this.handleChange}
									className="history-items"
									data-id="search"
								>
									<FontAwesomeIcon
										icon="plus-circle"
										style={{ color: "black" }}
									/>{" "}
									Add Exercise Item
								</div>
								{/* SEARCH BOX */}
								{this.form()}
							</div>

							{/* SHOW FOOD HISTORY OF SELECTED DATE					 */}

							{this.state.selectedDateArr && (
								<div>
									{this.state.selectedDateArr.map((val, idx) => {
										return (
											<ExerciseHistoryItem
												data={val}
												key={"exercise" + idx}
												deleteExerciseItem={this.deleteExerciseItem}
											/>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			</div>
		);
	}
}

class ExerciseHistoryItem extends Component {
	constructor(props) {
		super(props);
		this.state = { expandedView: false, showDelete: false };
	}
	toggleDelete = e => {
		if (e.type === "mouseover" && this.state.showDelete === false) {
			this.setState({ showDelete: true });
		} else if (e.type === "mouseleave" && this.state.showDelete === true) {
			this.setState({ showDelete: false });
		}
	};
	render() {
		console.log(this.props.data);
		return (
			<div className="row">
				<div
					className="history-items"
					onMouseOver={this.toggleDelete}
					onMouseLeave={this.toggleDelete}
				>
					<div className="row">
						<div className="col">{this.props.data.name}</div>
						<div className="col">
							{" "}
							Calories burnt:{this.props.data.calories_burnt}
						</div>
						{this.props.data.reps && (
							<div className="col">{this.props.data.reps} reps</div>
						)}

						{this.props.data.duration && (
							<div className="col">{this.props.data.duration} minutes</div>
						)}
						<div>
							{this.state.showDelete && (
								<div className="col">
									<div
										className="trash-icons"
										onClick={() =>
											this.props.deleteExerciseItem(this.props.data.id)
										}
									>
										<FontAwesomeIcon
											size="lg"
											icon="trash-alt"
											style={{ color: "red" }}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		redux: (key, data) => {
			switch (key) {
				case 1:
					dispatch({ type: "ADD_ACTIVITY", data });
					break;
				default:
					break;
			}
		}
	};
};
const mapStateToProps = state => {
	return {
		store: state
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Activity);
