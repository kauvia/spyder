import React, { Component } from "react";
import { api } from "../functions";
import moment from "moment";

class Food extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDay: new Date(),
			food: {
				name: "",
				calories: "",
				carbs: "",
				protiens: "",
				fats: "",
				time: Date.now()
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {}
	handleSubmit(e) {}
	handleChange(e) {}

	render() {
		return (
			<div id="food">
				<FoodHistory foodHistory={this.props.foodHistory} />
			</div>
		);
	}
}

class FoodHistory extends Component {
    constructor(props) {
		super(props);
		this.state = {
            counter:20
        };
        this.handleScroll=this.handleScroll.bind(this)
	}
	componentDidMount() {
		api("GET", "test").then(val => {
            let tester = val.data.food[954].created_at
            console.log(tester)
            let test = moment(tester).fromNow();
            console.log(test);
            moment().calendar(moment(tester))
            console.log(moment(tester))
		});

    }
    handleScroll(e){
        let box = e.target
  //      console.log(box.scrollTop)
        console.log(box.scrollTop > box.scrollHeight-box.offsetHeight)
  //      console.log()
        if (box.scrollTop > box.scrollHeight-box.offsetHeight){
            this.setState({counter:this.state.counter+20})
        }
    }
	render() {
		if (this.props.foodHistory){
		return <div style={{overflow:"scroll", height:"400px"}} onScroll={this.handleScroll}>{this.props.foodHistory.map((val,idx)=>{
            if (idx < this.state.counter){
                return <div key={"food"+idx}>{val.name}     {moment(val.created_at).fromNow()} </div>

            }
		})}</div>}else {return <div>Loading</div>}


	}
}

export default Food;
