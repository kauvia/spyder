import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Moment from 'moment'
import ActivityHistory from './ActivityHistory'

class Activity extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentDate: '', dayOffSet: 0,
            activity:{
                name:'', repsDuration: '', calories_burnt:'', reps: true
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }
    componentDidUpdate(){
        console.log(this.props.store)
        if(this.props.store.date !== undefined && this.state.currentDate == ''){
            this.setState({...this.state, currentDate: this.props.store.date})
        }
    }
    handleDate = () => {
        console.log(this.state.currentDate)
        
    }
    handleChange = (e) => {
        switch (e.target.name) {
            case "name":
                this.setState({...this.state, activity:{
                    ...this.state.activity, name: e.target.value
                }})
                break;
            case "repsDuration":
                this.setState({...this.state, activity:{
                    ...this.state.activity, repsDuration: e.target.value
                }})
                break;
            case "calories_burnt":
                this.setState({...this.state, activity:{
                    ...this.state.activity, calories_burnt: e.target.value
                }})
                break;
            case "click":
                let today = this.props.store.user_log.exercise.sort( (a, b) => {
                    return(new Moment(a.created_at).format('YYYYMMDD') - new Moment(b.created_at).format('YYYYMMDD'))
                })
                console.log(today)
                break;
            case "previousDay":
                let offset = parseInt(this.state.dayOffSet)
                offset = offset - 1
                this.setState({...this.state, dayOffSet: offset})
                break;
            case "nextDay":
                let offsetnext = parseInt(this.state.dayOffSet)
                offsetnext = offsetnext + 1
                this.setState({...this.state, dayOffSet: offsetnext})
                break;
            case "today":
                this.setState({...this.state, dayOffSet: 0})
                break;
            default:
                break;
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        switch (e.target.id) {
            case "newActivityForm":
                console.log(this.state)
                // axios.post()
                break;
            default:
                break;
        }
    }
    render(){
        return(
            <div id="activity">
                <div>
                    <form id="newActivityForm" onSubmit={this.handleSubmit}>
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.activity.name} />
                        <label>Activity</label><br />
                        <input type="text" name="repsDuration" onChange={this.handleChange} value={this.state.activity.repsDuration} />
                        <label>Reps / Duration</label><br />
                        <input type="text" name="calories_burnt" onChange={this.handleChange} value={this.state.activity.calories_burnt} />
                        <label>Calories</label><br />
                        <input type="submit" value="+" />
                    </form>
                    <button name="click" onClick={this.handleChange}>PRINT EXCERCISE FOR CURRENT DATE</button><br />
                    <button name="click" onClick={this.handleDate}>handleDate</button>
                    <div>
                        <button name="previousDay" onClick={this.handleChange}>Prev Day</button>
                        <button name="today" onClick={this.handleChange}>Today</button>
                        <button name="nextDay" onClick={this.handleChange}>Next Day</button>
                    </div>
                    <ActivityHistory activities={this.props.store.user_log.exercise} />
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
	return {
		redux: (key, data) => {
			switch (key) {
				case 1:
					dispatch({ type: "FOOD_PACKAGE", data });
					break;
				default:
					break;
			}
		}
	};
};
const mapStateToProps = (state) => {
    return{
        store: state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Activity);