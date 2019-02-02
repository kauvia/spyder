import React, { Component } from 'react'
import { connect } from 'react-redux'

class Setting extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: 'hidden', height: 'hidden', weight: 'hidden', target_weight:'hidden', age: 'hidden', gender: 'hidden',activity_level: 'hidden'
        }
        this.handleClick = this.handleClick.bind(this)
        this.createSettingsList = this.createSettingsList.bind(this)
    }
    handleClick = (e) => {
        // if(this.state[e.target.className] === 'hidden'){
        //     this.setState({...this.state, [e.target.className]: ''})
        // }else{
        //     this.setState({...this.state, [e.target.className]: 'hidden'})
        // }
        console.log(e.target)
    }
    createSettingsList = (letter) => {
        console.log(Object.keys(this.props.store.user))
        return(
            Object.keys(this.props.store.user).map( ele => {
                return(
                    <div key={ele} onClick={this.handleClick}>
                        {this.props.store.user[ele]}
                        {/* <div key={`${ele}Form`} className={this.state[key]} >
                            BEBBEBEBE
                        </div> */}
                    </div>
                )
            }) 
        )
    }
    render(){
        return(
            <div id="settings">
                SETTINGS <br /><br />
                { this.createSettingsList("h") }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        store: state
    }
}
export default connect(mapStateToProps)(Setting);