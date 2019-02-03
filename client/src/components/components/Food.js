import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import FoodList from './FoodList'

class Food extends Component {
    constructor(props){
        super(props)
        this.state = {
            food: {
                name: '', calories: '', carbs: '', protiens: '', fats: '', time: Date.now()
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        if(window.confirm('r you sure?')){
            axios.post(`/user/${this.props.user.email}/food`, {food: this.state.food})
            .then( res => {
                this.props.redux(1, res);
            })
        }else{this.setState({...this.state, food: {name: '', calories: '', carbs: '', protiens: '', fats: ''}})}
    }
    handleChange = (e) => {
        this.setState({...this.state, food:{...this.state.food, [e.target.name]: e.target.value}});
    }
    render(){
        return(
            <div id="food">
                Food
                {/* log new food for the day */}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.food.name}></input>
                    <input type="text" name="calories" onChange={this.handleChange} value={this.state.food.calories}></input>
                    <input type="text" name="carbs" onChange={this.handleChange} value={this.state.food.carbs}></input>
                    <input type="text" name="protiens" onChange={this.handleChange} value={this.state.food.protiens}></input>
                    <input type="text" name="fats" onChange={this.handleChange} value={this.state.food.fats}></input>
                    <input type="submit" value="submit food"></input>
                </form>
                <FoodList />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        store: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        redux: (key, data) => {
            switch (key) {
                case 1:
                    dispatch({type: 'ADD_FOOD_LOG', data})
                    break;
            
                default:
                    break;
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Food);