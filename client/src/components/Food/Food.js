import React, { Component } from "react";
import { api } from "../functions";
import moment from "moment";
import "./Food.css";
import dummy from "./dummy";
import Calendar from "react-calendar";
import Navbar from "../navbar";
import AllowanceContainer from "../Allowance-Container/AllowanceContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Food extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodHistory: null,
			allowance: null,
			query: "",
			results: [],
			displaySearch: false,
			foodArr: [],
			selectedDateArr: [],
			displayCalendar: false,
			selectedDate: `${moment(new Date())
				.startOf("day")
				.format()}`
		};
	}
	componentDidMount() {
		this.updateFromDb();
	}
	updateFromDb() {
		api("GET", "foods").then(val => {
			this.setState({ foodHistory: val.data.food });
			this.sortFoodHistory();
			this.updateSelectedDateHistory(this.state.selectedDate);
		});

		api("GET", "allowance").then(val => {
			this.setState({ allowance: val.data });
		});
	}
	addFoodItem = e => {
		console.log(e);
		api("POST", "/foods", {
			food: e,
			date: this.state.selectedDate
		}).then(val => {
			this.updateFromDb();
			this.setState({ displaySearch: false, results: [] });
		});
	};
	deleteFoodItem = e => {
		api("DELETE", "/foods", { id: e }).then(val => {
			this.updateFromDb();
		});
	};
	handleChange = e => {
		let target = e.target;
		if ("query" === target.name) {
			this.setState({ [target.name]: target.value });
			console.log(this.state);
		}
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
			this.state.displaySearch
				? this.setState({ displaySearch: false, results: [] })
				: this.setState({ displaySearch: true });
		}
		if ("toggleCalendar" === target.dataset.id) {
			this.state.displayCalendar
				? this.setState({ displayCalendar: false })
				: this.setState({ displayCalendar: true });
		}
	};
	handleSearch = e => {
		e.preventDefault();
		this.setState({
			results: dummy
		});
	};
	handleCalendar = e => {
		this.setState({ selectedDate: `${e}` });
		let tempArr = [];
		let selectedDate = moment(e).startOf("day");
		let foodArr = this.state.foodArr;
		for (let item in foodArr) {
			if (foodArr[item].length > 0) {
				let tempDate = moment(foodArr[item][0].created_at).startOf("day");
				if (selectedDate.diff(tempDate, "days") === 0) {
					tempArr = foodArr[item];
				}
			}
		}
		this.setState({ selectedDateArr: tempArr });
		this.setState({ displayCalendar: false });
	};
	updateSelectedDateHistory(val) {
		let tempArr = [];
		let selectedDate = moment(val).startOf("day");
		let foodArr = this.state.foodArr;
		for (let item in foodArr) {
			if (foodArr[item].length > 0) {
				let tempDate = moment(foodArr[item][0].created_at).startOf("day");
				if (selectedDate.diff(tempDate, "days") === 0) {
					tempArr = foodArr[item];
				}
			}
		}
		this.setState({ selectedDateArr: tempArr });
	}
	sortFoodHistory() {
		let history = this.state.foodHistory;
		let dayCounter = 0;
		let dayArray = [];
		let innerArray = [];
		let currentDate = new Date();
		currentDate = moment(currentDate).startOf("day");
		console.log(currentDate);

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
		this.setState({ foodArr: dayArray });
	}

	render() {
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
						// backgroundImage: `url(./assets/food.jpg)`,
						backgroundSize: "cover"
					}}
				/>
				{/* NAVBAR AND ALLOWANCE */}
				<Navbar />
				<AllowanceContainer data={this.state.allowance} />

				<div id="food-container" className="container">
					{/* CALENDAR AND CONTROLS */}
					<div
						id="food-date-container"
						className="row text-center"
						style={{ display: "flex" }}
						onClick={this.handleChange}
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
							onClick={this.handleChange}
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
					</div>
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
								<FontAwesomeIcon icon="plus-circle" style={{ color: "black" }} />{" "}
								Add Food Item
							</div>

							{/* SEARCH BOX */}

							{this.state.displaySearch && (
								<div
									id="SearchDisplay"
									className="container"
									style={{ zIndex: 2 }}
								>
									<div className="row">
										<form
											className="form-inline "
											onSubmit={this.handleSearch}
											onChange={this.handleChange}
										>
											<div className="input-group">
												<input
													name="query"
													className="form-control"
													type="search"
													placeholder="Search example 'potato'"
													aria-label="Search"
												/>
												<div className="input-group-append">
													<button
														className="btn btn-outline-light"
														type="submit"
													>
														Search
													</button>
												</div>
											</div>
										</form>
									</div>
									{this.state.results.map((val, idx) => {
										return (
											<FoodSearchItem
												data={val}
												key={"search" + idx}
												addFoodItem={this.addFoodItem}
											/>
										);
									})}
									<div className="row">
										<div className="col" />
										<div
											className="col"
											onClick={this.handleChange}
											data-id="search"
										>
											<FontAwesomeIcon
												icon="times-circle"
												style={{ color: "red" }}
											/>{" "}
											Cancel
										</div>{" "}
										<div className="col" />
									</div>
								</div>
							)}
						</div>

						{/* SHOW FOOD HISTORY OF SELECTED DATE					 */}

						{this.state.selectedDateArr && (
							<div>
								{this.state.selectedDateArr.map((val, idx) => {
									return (
										<FoodHistoryItem
											data={val}
											key={"food" + idx}
											deleteFoodItem={this.deleteFoodItem}
										/>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
class FoodSearchItem extends Component {
	constructor(props) {
		super(props);
		this.state = { showAdd: false };
	}

	toggleAdd = e => {
		if (e.type === "mouseover" && this.state.showAdd === false) {
			this.setState({ showAdd: true });
		} else if (e.type === "mouseleave" && this.state.showAdd === true) {
			this.setState({ showAdd: false });
		}
	};
	render() {
		return (
			<div className="row">
				<div
					className="history-items"
					onMouseOver={this.toggleAdd}
					onMouseLeave={this.toggleAdd}
				>
					{!this.state.expandedView && (
						<div className="row">
							<div
								className="col"
								onClick={() => this.props.addFoodItem(this.props.data)}
							>
								{this.props.data.name} Calories:{this.props.data.calories}
							</div>
							<div>
								{this.state.showAdd && (
									<div className="col">
										<div className="add-icons">
											<FontAwesomeIcon
												size="lg"
												icon="plus-circle"
												style={{ color: "green" }}
											/>
										</div>
									</div>
								)}
							</div>
						</div>
					)}

					{this.state.expandedView && (
						<div className="row">
							<div className="col" onClick={this.toggleView}>
								<div>
									{this.props.data.name} Calories:{this.props.data.calories}
								</div>
								<div>
									Fats:{this.props.data.fats} Carbs:{this.props.data.carbs}{" "}
									Proteins:{this.props.data.proteins}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
class FoodHistoryItem extends Component {
	constructor(props) {
		super(props);
		this.state = { expandedView: false, showDelete: false };
	}
	toggleView = () => {
		this.state.expandedView
			? this.setState({ expandedView: false })
			: this.setState({ expandedView: true });
	};
	toggleDelete = e => {
		if (e.type === "mouseover" && this.state.showDelete === false) {
			this.setState({ showDelete: true });
		} else if (e.type === "mouseleave" && this.state.showDelete === true) {
			this.setState({ showDelete: false });
		}
	};
	render() {
		return (
			<div className="row">
				<div
					className="history-items"
					onMouseOver={this.toggleDelete}
					onMouseLeave={this.toggleDelete}
				>
					{!this.state.expandedView && (
						<div className="row">
							<div className="col" onClick={this.toggleView}>
								{this.props.data.name} Calories:{this.props.data.calories}
							</div>
							<div>
								{this.state.showDelete && (
									<div className="col">
										<div
											className="trash-icons"
											onClick={() =>
												this.props.deleteFoodItem(this.props.data.id)
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
					)}

					{this.state.expandedView && (
						<div className="row">
							<div className="col" onClick={this.toggleView}>
								<div>
									{this.props.data.name} Calories:{this.props.data.calories}
								</div>
								<div>
									Fats:{this.props.data.fats} Carbs:{this.props.data.carbs}{" "}
									Proteins:{this.props.data.proteins}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default Food;
