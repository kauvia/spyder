import React, { Component } from 'react'
import { connect } from 'react-redux'

class Stats extends Component {
    constructor(props){
        super(props)
}
    componentDidMount() {
        console.log(this.props)
    }

    render(){
        if (this.props.statHistory) {
            return (
                <div>
                    Height: {this.props.statHistory[0].height}cm<br/>
                    Weight: {this.props.statHistory[0].weight}kg<br />
                    Target Weight: {this.props.statHistory[0].weight}kg<br />
                    Activity Level: {this.props.statHistory[0].activity_level}<br />

                    <button>Edit Stats</button>
                </div>
            )
        } else {
            return (
                <div>Loading stats...</div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return{
        store: state
    }
}

export default connect(mapStateToProps)(Stats);