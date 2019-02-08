import React, { Component } from "react";
import { connect } from "react-redux";
import { api } from "../functions";
import { ETIME } from "constants";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: null,
      gender: "",
      height: null,
      weight: null,
      target_weight: null,
      activity_level: "",
      heightMessage: "",
      weightMessage: "",
      targetWeightMessage: "",
      ageMessage: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    //check if inserted ht/wt/age is reasonable
    if (this.state.height < 100 || this.state.height > 250) {
      this.setState({ heightMessage: "Please enter a height between 100cm and 250cm." });
    } else if (this.state.weight > 400 || this.state.weight < 20) {
      this.setState({ weightMessage: "Please enter an appropriate weight between 20kg and 400kg!" });
    } else if (this.state.target_weight > 400 || this.state.target_weight < 20) {
      this.setState({ targetWeightMessage: "Please enter an appropriate weight between 20kg and 400kg!" });
    } else if (this.state.age < 7) {
        this.setState({ ageMessage: "Sorry! You have to be at least 7 years old to use this app."});
    }
    
    else {
      api("POST", "/stats", {
        height: this.state.height,
        weight: this.state.weight,
        target_weight: this.state.target_weight,
        activity_level: this.state.activity_level,
        gender: this.state.gender,
        age: this.state.age
      });
    }
  }

  handleChange(e) {
    if ("height" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    } else if ("weight" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    } else if ("target_weight" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    } else if ("activity_level" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    } else if ("age" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    } else if ("gender" === e.target.name) {
        this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleGender(e) {
      this.setState({ [e.target.name]: e.target.value});
  }

  handleActivityLevel(e) {
      this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (true) {
      return (
        <div>
            <form 
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}>
            
            <h5>Tell us about yourself! We need this data to calculate your daily calorie allowance.</h5><br />
            Age*: <input name="age" type="text" /><br />
            <div style={{ fontSize: '12px', height: '15px'}}>{this.state.ageMessage}</div>

            <label>
                Gender: 
                <select name="gender" onGender={this.handleGender}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </label>
            <hr />

            <h5>Current stats:</h5>
            Height: <input name="height" type="text"/>cm<br />
            <div style={{ fontSize: '12px', height: '15px'}}>{this.state.heightMessage}</div>
            Weight: <input name="weight" type="text"/>kg<br />
            <div style={{ fontSize: '12px', height: '15px'}}>{this.state.weightMessage}</div>

            <label>
                Activity Level:
                <select name="activity_level" onActivityLevel={this.handleActivityLevel}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
            <hr />

            <h5>Set your goal!</h5>
            Target Weight: <input name="target_weight" type="text"/>kg<br />
            <div style={{ fontSize: '12px', height: '15px'}}>{this.state.targetWeightMessage}</div>

            <input type="submit" value="Register!"/>
            </form>
        </div>
        )
    } else {
        return (<div>loAdInG.....</div>)
    }
  }
}

export default RegistrationForm;
