import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from "../navbar"
import AllowanceContainer from '../Allowance-Container/AllowanceContainer'

class Home extends Component {
    render(){
        return(
            <div id="home">
                <Navbar/>
                <AllowanceContainer/>
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