import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api } from '../functions';
import AllowanceContainer from '../Allowance-Container/AllowanceContainer'

class Stats extends Component {
    constructor(props){
        super(props)
        this.state = {
            statHistory : {}
        }
}
    componentDidMount() {
        api("GET", "stats").then(val => {this.setState({ statHistory : val.data.stat }); console.log(this.state)})
        // console.log(this.props.statistory)
    }

    render(){
        if (Object.keys(this.state.statHistory).length > 0) {
            return (
                <div>
                    <AllowanceContainer statHistory = {this.state.statHistory}/>
                    Height: {this.state.statHistory[0].height}cm<br/>
                    Weight: {this.state.statHistory[0].weight}kg<br />
                    Target Weight: {this.state.statHistory[0].weight}kg<br />
                    Activity Level: {this.state.statHistory[0].activity_level}<br />

                    <button>Edit Stats</button>
                </div>
            )
        } else {
            return (
                <div>
                    <AllowanceContainer />
                    Loading stats...
                </div>
            )
        }
    }
}

// const mapStateToProps = (state) => {
//     return{
//         store: state
//     }
// }

export default Stats;