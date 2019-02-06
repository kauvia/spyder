import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
    render(){
        return(
            <div id="home">
                Home <br />
                <div>
                    BMR
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        store: state
    }
}
export default connect(mapStateToProps)(Home);