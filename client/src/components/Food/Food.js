import React, { Component } from "react";
import { api } from "../functions";
import moment from "moment";
import "./Food.css";
import dummy from "./dummy";
import Calendar from "react-calendar";
import Navbar from "../navbar";
import AllowanceContainer from '../Allowance-Container/AllowanceContainer'
class Food extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodHistory: null,
			query: "",
			displaySearch: false,
			foodArr: [],
			selectedDateArr: [],
			displayCalendar: false,
			selectedDate: `${moment(new Date())
				.startOf("day")
				.format()}`
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleCalendar = this.handleCalendar.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
		this.handleToggleCalendar = this.handleToggleCalendar.bind(this);
	}
	componentDidMount() {
		//get food history and save in state
		api("GET", "foods").then(val => {
			this.setState({ foodHistory: val.data.food });
			this.sortFoodHistory();
			this.updateSelectedDateHistory(this.state.selectedDate);
		});
	}
	handleChange(e) {
		console.log(this.state.selectedDate);
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
	}

	handleSearch(e) {
		e.preventDefault();
		this.setState({
			results: dummy
		});
		this.setState({ displaySearch: true });
	}
	handleAddItem(e) {
		let queryIdx = parseInt(e.target.id);
		api("POST", "/foods", dummy[queryIdx]).then(val => {
			this.setState({ displaySearch: false });
		});
	}
	handleCalendar(e) {
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
	}
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
	handleToggleCalendar() {
		this.state.displayCalendar
			? this.setState({ displayCalendar: false })
			: this.setState({ displayCalendar: true });
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
				<Navbar />
				<AllowanceContainer/>
				<div
					id="food-container"
					className="container"
					style={{
						width: "500px",
						height: "500px",
						border: "2px solid black",
						backgroundColor: "antiquewhite",
						color: "black"
					}}
				>
					<div
						id="food-date-container"
						className="row text-center"
						style={{ display: "flex" }}
						onClick={this.handleChange}
					>
						<div className="col-3" data-id="arrowBack">
							{"<<<"}
						</div>
						<div
							id="date-navigator"
							className="col-6"
							onClick={this.handleToggleCalendar}
						>
							{moment(this.state.selectedDate).diff(
								moment(new Date()),
								"days"
							) === 0 && "Today"}
							{moment(this.state.selectedDate).diff(
								moment(new Date()),
								"days"
							) !== 0 && `${moment(this.state.selectedDate).format("LL")}`}
						</div>
						{moment(this.state.selectedDate).diff(
							moment(new Date()),
							"days"
						) !== 0 && (
							<div className="col-3" data-id="arrowNext">
								{">>>"}
							</div>
						)}
					</div>
					{this.state.displayCalendar && (
						<div className="row text-center" style={{ position: "absolute" }}>
							<div className="col-12">
								<Calendar
									onChange={this.handleCalendar}
									value={this.state.date}
									maxDate={new Date()}
								/>
							</div>
						</div>
					)}
					<div className="container">
						<div className="row">
							<div>Add Food Item</div>
						</div>
						<FoodHistory foodHistory={this.state.selectedDateArr} />
					</div>
				</div>
			</div>
			// 	{/* <div>
			// 		<form
			// 			className="form-inline "
			// 			onSubmit={this.handleSearch}
			// 			onChange={this.handleChange}
			// 		>
			// 			<div className="input-group">
			// 				<input
			// 					name="query"
			// 					className="form-control"
			// 					type="search"
			// 					placeholder="Add food"
			// 					aria-label="Search"
			// 				/>
			// 				<div className="input-group-append">
			// 					<button className="btn btn-outline-dark" type="submit">
			// 						Search
			// 					</button>
			// 				</div>
			// 			</div>
			// 		</form>
			// 		{this.state.displaySearch && (
			// 			<div id="SearchDisplay">
			// 				{this.state.results.map((val, idx) => {
			// 					return (
			// 						<div
			// 							id={idx + "result"}
			// 							key={"result" + idx}
			// 							onClick={this.handleAddItem}
			// 						>
			// 							{val.name} {val.Calories}
			// 						</div>
			// 					);
			// 				})}
			// 			</div>
			// 		)}
			// 	</div>
			// 	{this.state.displayCalendar && (
			// 		<Calendar onChange={this.handleCalendar} value={this.state.date} maxDate={new Date()} />
			// 	)}
			// 	{!this.state.displayCalendar && (
			// 		<div onClick={this.handleToggleCalendar}>{this.state.selectedDate}</div>
			// 	)}
			// 	<FoodHistory foodHistory={this.state.selectedDateArr}/>
			// </div> */}
		);
	}
}

class FoodHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {}
	handleScroll(e) {
		let box = e.target;
		//      console.log(box.scrollTop)
		console.log(box.scrollTop > box.scrollHeight - box.offsetHeight);
		//      console.log()
		if (box.scrollTop > box.scrollHeight - box.offsetHeight) {
			this.setState({ counter: this.state.counter + 20 });
		}
	}

	handleAddItem() {}

	render() {
		if (this.props.foodHistory) {
			console.log(this.props);
			return (
				<div className="row">
					{this.props.foodHistory.map((val, idx) => {
						return (
							<div key={"food" + idx}>
								{val.name} {moment(val.created_at).fromNow()} {val.created_at}
							</div>
						);
					})}
				</div>
			);
		} else {
			return <div>Loading</div>;
		}
	}
}

export default Food;
