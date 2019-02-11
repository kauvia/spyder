import React, { Component } from "react";
import { connect } from "react-redux";
import RegistrationForm from "./RegistrationForm";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AllowanceContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showRegistrationForm: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.setState({ showRegistrationForm: true });
	}

	calculateAllowance() {
		let { exercise, food, stat } = this.props.data;

		let currentStat = stat[0];

		const birthday = moment(currentStat.birthday);
		const today = moment(new Date());
		let age = today.diff(birthday, "years");

		// Harris-Benedict Formula

		// check for gender to calculate BMR
		let bmr;
		if (currentStat.gender === "male") {
			bmr =
				66 +
				currentStat.weight * 6.23 * 2.205 +
				(currentStat.height * 12.7) / 2.54 -
				age * 6.8;
			bmr = parseFloat(bmr);
		} else {
			bmr =
				655 +
				currentStat.weight * 4.35 * 2.205 +
				(currentStat.height * 4.7) / 2.54 -
				age * 4.7;
			bmr = parseFloat(bmr);
		}

		// check for activity level to adjust BMR accordingly
		let maintenance;
		if (currentStat.activity_level === "low") {
			maintenance = bmr * 1.2;
			maintenance = parseFloat(maintenance);
		} else if (currentStat.activity_level === "medium") {
			maintenance = bmr * 1.55;
			maintenance = parseFloat(maintenance);
		} else {
			maintenance = bmr * 1.9;
			maintenance = parseFloat(maintenance);
		}

		console.log(currentStat)

		// check for user goal (is it to gain, lose or maintain current weight?)
		let allowance;
		if (currentStat.target_weight === currentStat.weight) {
			// if user goal is to maintain current weight
			allowance = maintenance;
			allowance = parseInt(allowance);
		} else if (currentStat.target_weight > currentStat.weight) {
			// if user goal is to gain weight
			// we assume a rate of weight gain at 0.45kg/wk ==> surplus of 500 cal per day
			allowance = maintenance + 500;
			allowance = parseInt(allowance);
		} else {
			// if user goal is to lose weight
			// we assume a rate of weight loss at 0.45kg/wk ==> deficit of 500 cal per day
			allowance = maintenance - 500;
			allowance = parseInt(allowance);
		}

		// CALCULATE FOOD CALORIES
		let foodCalories = 0;
		food.map(val => {
			foodCalories += val.calories;


			return foodCalories
		});

		//CALCULATE EXERCISE CALORIES
		let exerciseCalories = 0;
		exercise.map(val => {
			exerciseCalories += val.calories_burnt;

			return exerciseCalories;
		});

		return {
			allowance: allowance,
			foodCalories: foodCalories,
			exerciseCalories: exerciseCalories
		};
	}

	render() {
		if (this.props.data && this.props.data.stat.length > 0) {
			let {
				allowance,
				foodCalories,
				exerciseCalories
			} = this.calculateAllowance();

			let remaining = allowance - foodCalories + exerciseCalories;
			let remainingColour;

			if (remaining < 0) {
				remainingColour = 'red';
			} else {
				remainingColour = 'black';
			}

			return (
				<div className="container border border-dark">
					<div className="row">
						<div className="col">
							<div className="row justify-content-center">{allowance}</div>
							<div className="row justify-content-center">allowance</div>
						</div>
						<div className="col">
							<div className="row  justify-content-center" style={{position:"absolute",top:"25%",left:"55%"}}>
								<FontAwesomeIcon icon="minus" style={{ color: "blue" }} />
							</div>
						</div>
						<div className="col">
							<div className="row justify-content-center">{foodCalories} </div>
							<div className="row justify-content-center">food</div>{" "}
						</div>
						<div className="col">
							<div className="row  justify-content-center" style={{position:"absolute",top:"25%",left:"55%"}}>
								<FontAwesomeIcon icon="plus" style={{ color: "blue" }} />
							</div>
						</div>
						<div className="col">
							<div className="row justify-content-center">
								{exerciseCalories}
							</div>
							<div className="row justify-content-center">exercise</div>
						</div>
						<div className="col">
							<div className="row  justify-content-center" style={{position:"absolute",top:"25%",left:"55%"}}>
								<FontAwesomeIcon icon="equals" style={{ color: "blue" }} />
							</div>
						</div>
						<div className="col">
							<div className="row justify-content-center" style={{ color: remainingColour }}>
								{remaining}{" "}

							</div>
						</div>
					);
				}
			}else {			return <div>Loading</div>;
			}
		} else {

			return (
				<div className="container text border border-dark">
					<div className="row">
						<div className="col">
							<div className="row">??</div>
							<div className="row">allowance</div>
						</div>
						<div className="col">
							<FontAwesomeIcon icon="minus" style={{ color: "blue" }} />
						</div>
						<div className="col">
							<div className="row">??</div>
							<div className="row">food</div>{" "}
						</div>
						<div className="col">
							<FontAwesomeIcon icon="plus" style={{ color: "blue" }} />
						</div>
						<div className="col">
							<div className="row">??</div>
							<div className="row">exercise</div>
						</div>
						<div className="col">
							<FontAwesomeIcon icon="equals" style={{ color: "blue" }} />
						</div>
						<div className="col">
							<div className="row">??</div>
							<div className="row">remaining</div>
						</div>
						<div className="col">
							<FontAwesomeIcon
								icon="exclamation-triangle"
								style={{ color: "red" }}
								size="2x"
								onClick={this.handleClick}
								line-height="inherit"
							/>
							<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalLong">
							!!
							</button>
							<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Registration Form</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
	  <RegistrationForm />
      </div>
    </div>
  </div>
</div>
							{this.state.showRegistrationForm && <RegistrationForm />}
						</div>
					</div>
				</div>
			);

		}
	}
}

const mapStateToProps = state => {
	return {
		store: state
	};
};

export default connect(mapStateToProps)(AllowanceContainer);
