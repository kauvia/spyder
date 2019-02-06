import React, { Component } from 'react'
import {api} from "../functions"
import FoodList from './FoodList'

class Food extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentDay: new Date(),
            dayTracker: 1,
            food: {
                name: '', calories: '', carbs: '', protiens: '', fats: '', time: Date.now()
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit = (e) => {
    }
    handleChange = (e) => {
    }


    render(){
        return(
            <div id="food">

            </div>
        )
    }
}

export default Food;