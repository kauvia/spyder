import React, { Component } from "react";
import { api } from "../functions";
import moment from "moment";
import "./Food.css";
import dummy from "./dummy";

class Food extends Component {
	constructor(props) {
		super(props);
		this.state = {
			foodHistory: null,
			query: "",
			displaySearch: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);

		this.handleAddItem = this.handleAddItem.bind(this);
	}
	componentDidMount() {
		//get food history and save in state
		api("GET", "foods").then(val => {
			this.setState({ foodHistory: val.data.food });
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

				<FoodHistory foodHistory={this.state.foodHistory} />
			</div>
		);
	}
}

class FoodHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			counter: 20
		};
		this.handleScroll = this.handleScroll.bind(this);
	}
	componentDidMount() {
		console.log(this.props);
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
	magic() {
		let history = this.props.foodHistory;
		let dayCounter = 0;
		let dayArray = [];
		let innerArray = [];

		for (let i = 0; i < this.props.foodHistory.length; i++) {
			if (dayCounter === moment().diff(history[i].created_at, "days")) {
				innerArray.push(history[i]);
			} else {
				dayArray.push(innerArray);
				innerArray = [];
				dayCounter = moment().diff(history[i].created_at, "days");
				innerArray.push(history[i]);
			}
		}
		return (
			<div>
				{dayArray.map((val, idx) => {
					return (
						<div style={{ border: "5px solid black" }}>
							{val.map((val, idx) => {
								return (
									<div key={"food" + val.id} id={val.id}>
										{val.name}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
	render() {
		if (this.props.foodHistory) {
			return (
				<div>
					<div
						style={{ overflow: "scroll", height: "400px" }}
						onScroll={this.handleScroll}
					>
						{this.magic()}
						{/* {this.props.foodHistory.map((val, idx) => {
							if (idx < this.state.counter) {
								return (
									<div key={"food" + idx}>
										{val.name} {moment(val.created_at).fromNow()}
									</div>
								);
							}
						})} */}
					</div>
				</div>
			);
		} else {
			return <div>Loading</div>;
		}
	}
}

export default Food;
