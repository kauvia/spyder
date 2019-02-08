import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api } from '../functions'
import AllowanceContainer from '../Allowance-Container/AllowanceContainer'

class EditStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            weight: 0,
            target_weight: 0,
            activity_level: "",
            heightMessage: "",
            weightMessage: ""
        };
        this.handleAddItem = this.handleAddItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleAddItem(e) {
        e.preventDefault();
        console.log(e);

        //check if inserted ht/wt is reasonable
        if (this.state.height < 100 || this.state.height > 250) {
            this.setState({
                heightMessage: "Please enter a height between 100cm and 250cm."
            });
        } else if (this.state.weight > 400 || this.state.target_weight < 20) {
            this.setState({
                weightMessage: "Please enter an appropriate weight!"
            });
        } else {
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
            this.setState({ [e.target.name]: e.target.value });
        } else if ("weight" === e.target.name) {
            this.setState({ [e.target.name]: e.target.value });
        } else if ("target_weight" === e.target.name) {
            this.setState({ [e.target.name]: e.target.value });
        } else if ("activity_level" === e.target.name) {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    render() {
        console.log(this.props.statHistory)
        if (this.props.statHistory) {
            return (
                <div id="stats">
                    <form 
                    onSubmit={this.handleAddItem}
                    onChange={this.handleChange}>
                        Height: <input name="height" type="text" placeholder={this.props.statHistory.height}/>cm<br />
                        <div style={{ fontSize: 12 + "px", height: 15 + "px" }}>
							{this.state.heightMessage}
						</div>
                        Weight: <input name="weight" type="text" placeholder={this.props.statHistory.weight}/>kg<br />
                        <div style={{ fontSize: 12 + "px", height: 15 + "px" }}>
							{this.state.weightMessage}
						</div>
                        Target Weight: <input name="target_weight" type="text" placeholder={this.props.statHistory.target_weight}/>kg<br />
                        <div style={{ fontSize: 12 + "px", height: 15 + "px" }}>
							{this.state.weightMessage}
						</div>
                        Activity Level: <input name="activity_level" type="text" placeholder={this.props.statHistory.activity_level}/>
                        <input type="submit" value="Edit Stats"/>
                    </form>
                </div>
            )
        } else {
            return (<div>looooaddddiiingnggg</div>)
        }
    }

}

export default EditStats;