import React, { Component } from "react";
import { api } from "../functions";

class EditStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: null,
      weight: null,
      target_weight: null,
      activity_level: " ",
      heightMessage: "",
      weightMessage: "",
      targetWeightMessage: "",
      activityLevelMessage: ""
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleActivityLevel = this.handleActivityLevel.bind(this);
  }

  handleAddItem(e) {
    e.preventDefault();
    console.log(e);

    this.setState({
        heightMessage: "",
        weightMessage: "",
        targetWeightMessage: "",
        activityLevelMessage: ""
      });

    //check if inserted ht/wt is reasonable
    let everythingIsOk = true;

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
        this.setState({ heightMessage: "Please input numbers!"});
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
    
    if (everythingIsOk) {
      api("POST", "/stats", {
        height: this.state.height,
        weight: this.state.weight,
        target_weight: this.state.target_weight,
        activity_level: this.state.activity_level,
        gender: this.props.statHistory.gender,
        age: this.props.statHistory.age
      });
    }
  }

  handleChange(e) {
    if ("height" === e.target.name) {
      this.setState({ [e.target.name]: parseFloat(e.target.value) });
    } else if ("weight" === e.target.name) {
      this.setState({ [e.target.name]: parseFloat(e.target.value) });
    } else if ("target_weight" === e.target.name) {
      this.setState({ [e.target.name]: parseFloat(e.target.value) });
    } else if ("activity_level" === e.target.name) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleActivityLevel(e) {
    this.setState({ activity_level: e.target.value });
  }

  render() {
    console.log(this.props.statHistory);
    if (this.props.statHistory) {
      return (
        <div id="stats">
          <form onSubmit={this.handleAddItem} onChange={this.handleChange}>
            Height:{" "}
            <input
              name="height"
              type="text"
              placeholder={this.props.statHistory.height}
            />
            cm
            <br />
            <div style={{ fontSize: 12 + "px", height: 15 + "px" }}>
              {this.state.heightMessage}
            </div>
            Weight:{" "}
            <input
              name="weight"
              type="text"
              placeholder={this.props.statHistory.weight}
            />
            kg
            <br />
            <div style={{ fontSize: 12 + "px", height: 15 + "px" }}>
              {this.state.weightMessage}
            </div>
            Target Weight:{" "}
            <input
              name="target_weight"
              type="text"
              placeholder={this.props.statHistory.target_weight}
            />
            kg
            <br />
            <div style={{ fontSize: 12 + "px", height: 15 + "px" }}>
              {this.state.targetWeightMessage}
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

            <input type="submit" value="Edit Stats" />
          </form>
        </div>
      );
    } else {
      return <div>looooaddddiiingnggg</div>;
    }
  }
}

export default EditStats;
