import React, { Component } from 'react'
import { connect } from 'react-redux'

class Activity extends Component {
    render(){
        return(
            <div id="activity">
                Activity
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        store: state
    }
}
export default connect(mapStateToProps)(Activity);