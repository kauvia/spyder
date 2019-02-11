import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { api } from "../functions";
import { Calendar } from 'react-calendar'
import ActivityHistory from './ActivityHistory'
import Navbar from "../navbar"
import AllowanceContainer from '../Allowance-Container/AllowanceContainer'
import { duration } from 'moment';

class Activity extends Component {
    constructor(props){
        super(props);
        this.state = {
            allowance: null,

            activity:{
                name: '', repsDuration: '', calories_burnt: '', reps: false,
                disable: false, useModel: false, selectModel: false
            },
            model: {},
            form: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.models = this.models.bind(this);
        this.form = this.form.bind(this);
    }
    componentDidMount() {
		this.updateFromDb();
	}
    updateFromDb() {
		api("GET", "allowance").then(val => {
			this.setState({ allowance: val.data });
		});
	}
    handleChange(e){
        switch (e.target.name) {
            case "name":
                this.setState({...this.state, activity:{
                    ...this.state.activity, name: e.target.value
                }})
                break;
            case "repsDuration":
                if(this.state.model !== undefined && this.state.activity.useModel === true){
                    let rd = e.target.value;
                    let cal = parseInt(rd) * parseFloat(this.state.model.calories_burnt_perunit)
                    this.setState({...this.state, activity:{
                    ...this.state.activity, repsDuration: rd, calories_burnt: cal
                }})
                }else{
                    this.setState({...this.state, activity:{
                    ...this.state.activity, repsDuration: e.target.value
                }})
                }
                break;
            case "calories_burnt":
                this.setState({...this.state, activity:{
                    ...this.state.activity, calories_burnt: e.target.value
                }})
                break;
            case "reps":
                if(this.state.activity.disable === 'readonly'){
                }else{
                    this.setState({...this.state, activity:{
                        ...this.state.activity, reps: e.target.checked
                    }})
                }
                break;
            case "useModel":
                if(e.target.checked === true){
                    this.setState({...this.state, activity:{
                    ...this.state.activity, useModel: true, disable: "readonly", selectModel: true
                    }})
                }else if(e.target.checked === false){
                    this.setState({...this.state, activity:{
                    ...this.state.activity, useModel: false, disable: false, selectModel: false
                    }})
                }
                
                break;
            case "selectModel":
                if(this.state.activity.selectModel){
                    this.setState({...this.state, activity:{
                        ...this.state.activity, selectModel: false
                        }})
                }else {
                    this.setState({...this.state, activity:{
                        ...this.state.activity, selectModel: true, useModel: true, disable: "readonly"
                        }})
                }
                break;
            case "model":
                let model = this.props.store.food_exercise_models.exercise[e.target.value]
                let reps = model.reps
                this.setState({...this.state, activity:{
                        ...this.state.activity, selectModel: false, name: model.name, repsDuration: 1, calories_burnt: model.calories_burnt_perunit, reps: reps
                        }, model: model })
                break;
            case "form":
                if(this.state.form){
                    this.setState({...this.state, form: false})
                }else{
                    this.setState({...this.state, form: true})
                }
                break;
            default:
                break;
        }
    }
    handleSubmit(e){
        e.preventDefault()
        switch (e.target.id) {
            case "newActivityForm":
                let number = this.state.activity.repsDuration
                let rORd = this.state.activity.reps
                let reps;
                let duration;
                if(rORd){reps = number; duration = null;}else{duration = number; reps = null;}
                let activityNew = {
                    name: name, reps: reps, duration: duration, calories: cal
                }
                let cal = this.state.activity.calories_burnt
                let name = this.state.activity.name
                if(Number.isInteger(parseInt(number)) && Number.isInteger(parseInt(cal))){
                    // NOT DONE! work on the response... need to include 
                    // created_at (change to moment object)/ calories_burnt / duration / reps / id / name / user_id
                    axios.post('/exercises/new', activityNew)
                    .then( res => {
                        this.props.redux(1, res)
                    })
                    this.setState({...this.state, activity:{ ...this.state.activity,
                        name: '', repsDuration: '', calories_burnt: '', reps: false,
                        disable: false, useModel: false, selectModel: false
                        },
                        model: {}
                    })
                }
                break;
            default:
                break;
        }
    }
    models(){
        if(this.state.activity.selectModel){
            return this.props.store.food_exercise_models.exercise.map( (ele, num) => {
                return(
                    <button name="model" value={num} key={ele.name} onClick={this.handleChange}>
                        {ele.name}
                    </button>
                )
            })
        }
    }
    form(){
        if(this.state.form){
            return(
        <div>
            {/* ==========================================
                                NEW ACTIVITY FORM
                ========================================== */}
                <form id="newActivityForm" onSubmit={this.handleSubmit}>
                    {/* input fields */}
                        <input 
                            className={this.state.activity.disable.toString()}
                            readOnly={this.state.activity.disable}
                            type="text"
                            name="name"
                            autoComplete="off"
                            onChange={this.handleChange} value={this.state.activity.name}
                        />
                        <label>Activity</label><br />

                        <input 
                            type="text" 
                            name="repsDuration" 
                            onChange={this.handleChange} 
                            value={this.state.activity.repsDuration} 
                            autoComplete="off"
                        />
                        <label>Reps / Duration (mins)</label><br />

                        <input 
                            className={this.state.activity.disable.toString()} 
                            readOnly={this.state.activity.disable} 
                            type="text" 
                            name="calories_burnt" 
                            autoComplete="off"
                            onChange={this.handleChange} 
                            value={this.state.activity.calories_burnt.toString()} 
                        />
                        <label>Calories</label><br />
                    {/* REPS TOGGLE */}
                    <div>
                        <label> Reps </label>
                        <label className="switch">
                        <input 
                            type="checkbox" 
                            name="reps" 
                            onChange={this.handleChange} 
                            checked={this.state.activity.reps}  
                        />
                        <span className="slider"></span>
                        </label> <label> Duration </label></div><br />
                    {/* SUBMIT BUTTON */}
                        <input type="submit" value="SUBMIT" />
                    </form>
                    {/* MODELS TOGGLE */}
                    
                    <label> Use Models </label>
                        <label className="switch">
                        <input 
                            type="checkbox" 
                            name="useModel" 
                            onChange={this.handleChange} 
                            checked={this.state.activity.useModel}  
                        />
                        <span className="slider"></span>
                    </label><br />
                    {/* CALL MODEL BUTTONS */}
                    <button 
                        name="selectModel" 
                        onClick={this.handleChange}>Choose Another Exercise</button> <br />
            {/* ==========================================
                            MODEL BUTTONS
            ========================================== */}
                    { this.models() }
        </div>
            )}
    }
    render(){
        // {/* ==========================================
        //             ACTIVITY HISTORY // LOADING
        // ========================================== */}
        let stuff;
        if(this.props.store.user_log.exercise !== undefined){
            stuff = <ActivityHistory activities={this.props.store.user_log.exercise} />
        }else{
            stuff = <h2>loading...</h2>
        }
        return(
            <div id="activity">
            <Navbar/>
            <AllowanceContainer data={this.state.allowance}/>
                <div id="activityStuff">
                    <button name="form" onClick={this.handleChange}>ADD ACTIVITY</button>
                    { this.form() }
                
                    
            {/* ==========================================
                            ACTIVITY HISTORY // RENDER
            ========================================== */}
                    {stuff}
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
					dispatch({ type: "ADD_ACTIVITY", data });
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