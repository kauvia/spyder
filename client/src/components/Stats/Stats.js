import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api } from '../functions'
import AllowanceContainer from '../Allowance-Container/AllowanceContainer'
import EditStats from './EditStats'
import Navbar from "../navbar"

class Stats extends Component {
    constructor(props){
        super(props)
        this.state = {
            statHistory: {},
            showEditForm: false
        }

        this.handleClick = this.handleClick.bind(this)

    }

    componentDidMount() {
        api("GET", "stats").then(val => {this.setState({ statHistory: val.data.stat }); console.log(this.state)})
    }

    handleClick(e) {
        this.setState({ showEditForm: true })
    }

    render(){
        if (Object.keys(this.state.statHistory).length > 0) {
            return (
                <div>
                    <Navbar/>
                    <AllowanceContainer statHistory={this.state.statHistory}/>

                    Height: {this.state.statHistory[0].height}cm<br/>
                    Weight: {this.state.statHistory[0].weight}kg<br />
                    Target Weight: {this.state.statHistory[0].target_weight}kg<br />
                    Activity Level: {this.state.statHistory[0].activity_level}<br />

                    <button onClick={this.handleClick}>Edit Stats</button>

                    {this.state.showEditForm && <EditStats statHistory={this.state.statHistory[0]}/>}

                </div>
            )
        } else {
            return (
                <div>
                                        <Navbar/>
                                        <AllowanceContainer/>
                    <header style={{border: '2px solid black'}}></header>

                    Loading stats...
                </div>
            )
        }
    }
}

export default Stats;