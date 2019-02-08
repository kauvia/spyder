import React, { Component } from "react";
import { connect } from "react-redux";
import RegistrationForm from './RegistrationForm'

class AllowanceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowance: 0,
      food: 0,
      exercise: 0,
      left: 0,
      updated: false,
      showRegistrationForm: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ showRegistrationForm: true });
  }

  calculateAllowance() {
    console.log(this.props.statHistory);
    let currentStat = this.props.statHistory[0];

    // Harris-Benedict Formula

    // check for gender to calculate BMR
    let bmrString;
    let bmr;
    if (currentStat.gender === "male") {
      bmrString =
        66 +
        currentStat.weight * 6.23 * 2.205 +
        (currentStat.height * 12.7) / 2.54 -
        currentStat.age * 6.8;
      bmr = parseFloat(bmrString);
    } else {
      bmrString =
        655 +
        currentStat.weight * 4.35 * 2.205 +
        (currentStat.height * 4.7) / 2.54 -
        currentStat.age * 4.7;
      bmr = parseFloat(bmrString);
    }

    console.log(currentStat.gender);
    console.log(bmr);

    // check for activity level to adjust BMR accordingly
    let maintenanceString;
    let maintenance;
    if (currentStat.activity_level === "low") {
      maintenanceString = bmr * 1.2;
      maintenance = parseFloat(maintenanceString);
    } else if (currentStat.activity_level === "medium") {
      maintenanceString = bmr * 1.55;
      maintenance = parseFloat(maintenanceString);
    } else {
      maintenanceString = bmr * 1.9;
      maintenance = parseFloat(maintenanceString);
    }

    // check for user goal (is it to gain, lose or maintain current weight?)
    let allowanceString;
    let allowance;
    if (currentStat.target_weight === currentStat.weight) {
      // if user goal is to maintain current weight
      allowanceString = maintenance;
      allowance = parseInt(allowanceString);
    } else if (currentStat.target_weight > currentStat.weight) {
      // if user goal is to gain weight
      // we assume a rate of weight gain at 0.45kg/wk ==> surplus of 500 cal per day
      allowanceString = maintenance + 500;
      allowance = parseInt(allowanceString);
    } else {
      // if user goal is to lose weight
      // we assume a rate of weight loss at 0.45kg/wk ==> deficit of 500 cal per day
      allowanceString = maintenance - 500;
      allowance = parseInt(allowanceString);
    }

    // hard-code these first while waiting on other components
    let food = 50;
    let exercise = 52;

    this.setState({
      allowance: allowance,
      food: food,
      exercise: exercise,
      left: allowance - food + exercise,
      updated: true
    });
  }

  componentDidUpdate() {
    if (this.state.updated === false && this.props.statHistory) {
      this.calculateAllowance();
    }
  }

  render() {
    if (this.props.statHistory) {
      return (
        <div>
          {this.state.allowance} - {this.state.food} + {this.state.exercise} ={" "}
          {this.state.left} <br />
          allowance food exercise left
          <br />
        </div>
      );
    } else {
      return (
        <div>
          ?? - ?? + ?? = ?? <br />
          allowance food exercise left <button onClick={this.handleClick}>!!!!</button> <br />
          PLEASE UPDATE YOUR STATS FOR UR CALORIE ALLOWANCE TO BE CALCULATED
          {this.state.showRegistrationForm && <RegistrationForm />}
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
