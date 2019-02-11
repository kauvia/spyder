import React, { Component } from "react";
import { api } from "../functions";
import Calendar from "react-calendar";
import DatePicker from "react-bootstrap-date-picker";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: null,
      birthday: " ",
      gender: " ",
      height: null,
      weight: null,
      target_weight: null,
      activity_level: " ",
      heightMessage: "",
      weightMessage: "",
      targetWeightMessage: "If your target weight is lower than your current weight, we assume a goal of losing approximately 0.5kg/wk. We then take this assumption into consideration when calculating your daily calorie allowance. If your target weight is higher than your current weight, we assume a goal of gaining approximately 0.5kg/wk.",
      ageMessage: "",
      genderMessage: "",
      activityLevelMessage: "Low: sedentary (Little or no exercise. Medium: Moderate exercise/sports 3-5 times a week. High: Very hard exercise/sports, physical job.",
      displayCalendar: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleActivityLevel = this.handleActivityLevel.bind(this);
    this.handleCalendar = this.handleCalendar.bind(this);
  }


  
  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      heightMessage: "",
      weightMessage: "",
      targetWeightMessage: "",
      ageMessage: "",
      genderMessage: "",
      activityLevelMessage: ""
    });

    //check if inserted ht/wt/age is reasonable
    let everythingIsOk = true;

    if (this.state.gender === " ") {
      this.setState({ genderMessage: "Please select your gender." });
      everythingIsOk = false;
    }

    if (this.state.birthday === " ") {
      everythingIsOk = false;
    }

    if (this.state.activity_level === " ") {
      this.setState({
        activityLevelMessage: "Please select your activity level."
      });
      everythingIsOk = false;
    }

    if (this.state.height < 100 || this.state.height > 250) {
      this.setState({
        heightMessage: "Please enter a height between 100cm and 250cm."
      });
      everythingIsOk = false;
    } else if (typeof this.state.height !== "number" || !(this.state.height)) {
      this.setState({ heightMessage: "Please input numbers!" });
      everythingIsOk = false;
    }

    if (this.state.weight > 400 || this.state.weight < 20) {
      this.setState({
        weightMessage:
          "Please enter an appropriate weight between 20kg and 400kg!"
      });
      everythingIsOk = false;
    } else if (typeof this.state.weight !== "number" || !(this.state.weight)) {
      this.setState({ weightMessage: "Please input numbers!" });
      everythingIsOk = false;
    }

    if (this.state.target_weight > 400 || this.state.target_weight < 20) {
      this.setState({
        targetWeightMessage:
          "Please enter an appropriate weight between 20kg and 400kg!"
      });
      everythingIsOk = false;
    } else if (typeof this.state.target_weight !== "number" || !(this.state.target_weight)) {
      this.setState({ targetWeightMessage: "Please input numbers!" });
      everythingIsOk = false;
    }

    if (this.state.age < 7) {
      this.setState({
        ageMessage:
          "Sorry! You have to be at least 7 years old to use this app."
      });
      everythingIsOk = false;
    }
    console.log(this.state);
    if (everythingIsOk) {
      api("POST", "/stats", {
        height: this.state.height,
        weight: this.state.weight,
        target_weight: this.state.target_weight,
        activity_level: this.state.activity_level,
        gender: this.state.gender,
        age: this.state.age,
        birthday: this.state.birthday
      });
    }
  }

  handleChange(e) {
    if ("height" === e.target.name) {
      this.setState({ [e.target.name]: parseFloat(e.target.value) });
    } 
    
    if ("weight" === e.target.name) {
      this.setState({ [e.target.name]: parseFloat(e.target.value) });
    }
    
    if ("target_weight" === e.target.name) {
      this.setState({ [e.target.name]: parseFloat(e.target.value) });
    }
    
    if ("activity_level" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    }
    
    if ("age" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    }
    
    if ("gender" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    }
    
    if ("birthday" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    }
    
    if ("toggleCalendar" === e.target.dataset.id) {
      this.state.displayCalendar ? this.setState({ displayCalendar: false}) : this.setState({ displayCalendar: true});
    }
  }

  handleGender(e) {
    this.setState({ gender: e.target.value });
  }

  handleActivityLevel(e) {
    this.setState({ activity_level: e.target.value });
  }

  handleCalendar(e) {
    this.setState({ displayCalendar: false });

  }

  render() {
    if (true) {
      return (
        <div>
          <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <h5>
              Tell us about yourself! We need this data to calculate your daily
              calorie allowance.
            </h5>
            Age*: <input name="age" type="text" />
            <br />
            <div style={{ fontSize: "12px", height: "15px" }}>
              {this.state.ageMessage}
            </div>
            Birthday: <input name="birthday" type="text" data-id="toggleCalendar" onClick={this.handleChange} />
            <DatePicker name="birthday" onChange={this.handleCalendar} value={this.state.date}/><br />
            <label>
              Gender:
              <select name="gender" onChange={this.handleGender}>
                <option value=" "> </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <div style={{ fontSize: "12px", height: "15px" }}>
              {this.state.genderMessage}
            </div>
            <hr />
            <h5>Current stats:</h5>
            Height: <input name="height" type="text" />
            cm
            <br />
            <div style={{ fontSize: "12px", height: "15px" }}>
              {this.state.heightMessage}
            </div>
            Weight: <input name="weight" type="text" />
            kg
            <br />
            <div style={{ fontSize: "12px", height: "15px" }}>
              {this.state.weightMessage}
            </div>
            <label>
              Activity Level:
              <select name="activity_level" onChange={this.handleActivityLevel}>
                <option value=" "> </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <div style={{ fontSize: "12px", height: "15px" }}>
              {this.state.activityLevelMessage}
            </div>
            <hr />
            <h5>Set your goal!</h5>
            Target Weight: <input name="target_weight" type="text" />
            kg
            <br />
            <div style={{ fontSize: "12px", height: "15px" }}>
              {this.state.targetWeightMessage}
            </div>
            

            <input type="submit" value="Register!" />
          </form>
        </div>
      );
    } else {
      return <div>loAdInG.....</div>;
    }
  }
}

export default RegistrationForm;
