import React, { Component } from 'react'
import { connect } from 'react-redux'

class FoodList extends Component {
    render(){
        return(
            <div id="foodlist">
                foodList_ log
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        store: state
    }
}
export default connect(mapStateToProps)(FoodList);