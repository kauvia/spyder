import React, { Component } from 'react'
import { connect } from 'react-redux'

class AllowanceContainer extends Component {
    constructor(props){
        super(props)
    }

    render() {
        if (this.props.statHistory) {
            return (
                <div>
                    2000 - 800 + 200 = 1400 <br />
                    allowance  food  exercise  left<br/>
                </div>
            )
        } else {
            return (
                <div>
                ?? - ?? + ?? = ?? <br />
                allowance  food  exercise  left !!!!!!!!! <br />
                PLEASE UPDATE YOUR STATS FOR UR CALORIE ALLOWANCE TO BE CALCULATED
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return{
        store: state
    }
}

export default connect(mapStateToProps)(AllowanceContainer);