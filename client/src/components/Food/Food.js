import React, { Component } from "react";
import { api } from "../functions";
import moment from "moment";
import "./Food.css";
import dummy from "./dummy";
import Calendar from "react-calendar";

class Food extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodHistory: null,
			query: "",
			displaySearch: false,
			counter: 20,
			foodArr: [],
			selectedDateArr:[],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleCalendar = this.handleCalendar.bind(this)
		this.handleAddItem = this.handleAddItem.bind(this);
	}
	componentDidMount() {
		//get food history and save in state
		api("GET", "foods").then(val => {
			this.setState({ foodHistory: val.data.food });
			this.magic()
		});
	}
	handleChange(e) {
		let target = e.target;
		if ("query" === target.name) {
			this.setState({ [target.name]: target.value });
			console.log(this.state);
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
		api();
		let queryIdx = parseInt(e.target.id);
		api("POST", "/foods", dummy[queryIdx]).then(val => {
			this.setState({ displaySearch: false });
		});
	}
	handleCalendar(e){
		let tempArr = [];
		let selectedDate = moment(e)
		let foodArr=this.state.foodArr
		for (let item in foodArr){
			let tempDate = moment (foodArr[item][0].created_at)
			if (selectedDate.diff(tempDate,"days")===0){
				tempArr = foodArr[item]
			}
		}
		this.setState({selectedDateArr:tempArr})

	}
	magic() {
		let history = this.state.foodHistory;
		let dayCounter = 0;
		let dayArray = [];
		let innerArray = [];


		for (let i = 0; i < history.length; i++) {
			if (dayCounter === moment().diff(history[i].created_at, "days")) {
				innerArray.push(history[i]);
			} else {
				dayArray.push(innerArray);
				innerArray = [];
				dayCounter = moment().diff(history[i].created_at, "days");
				innerArray.push(history[i]);
			}
			if (i === history.length-1){
				if (innerArray.length >0){
					dayArray.push(innerArray)
				}
			}
		}
		this.setState({foodArr:dayArray})
	}
	render() {
		return (
			<div id="food">
				<div>
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
								placeholder="Add food"
								aria-label="Search"
							/>
							<div className="input-group-append">
								<button className="btn btn-outline-dark" type="submit">
									Search
								</button>
							</div>
						</div>
					</form>
					{this.state.displaySearch && (
						<div id="SearchDisplay">
							{this.state.results.map((val, idx) => {
								return (
									<div
										id={idx + "result"}
										key={"result" + idx}
										onClick={this.handleAddItem}
									>
										{val.name} {val.Calories}
									</div>
								);
							})}
						</div>
					)}
				</div>
				<Calendar onChange={this.handleCalendar} value={this.state.date}/>

				<FoodHistory foodHistory={this.state.selectedDateArr} />
			</div>
		);
	}
}

class FoodHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {

	}
	handleScroll(e) {
		let box = e.target;
		//      console.log(box.scrollTop)
		console.log(box.scrollTop > box.scrollHeight - box.offsetHeight);
		//      console.log()
		if (box.scrollTop > box.scrollHeight - box.offsetHeight) {
			this.setState({ counter: this.state.counter + 20 });
		}
	}

	handleAddItem(){
	

	}
	
	render() {
		if (this.props.foodHistory) {
			console.log(this.props)
			return (
				<div>
					<div
						style={{ overflow: "scroll", height: "400px" }}
						onScroll={this.handleScroll}
					>
					
						{this.props.foodHistory.map((val, idx) => {
	
								return (
									<div key={"food" + idx}>
										{val.name} {moment(val.created_at).fromNow()} {val.created_at}
									</div>
								);
						
						})}
					</div>
				</div>
			);
		} else {
			return <div>Loading</div>;
		}
	}
}

export default Food;
