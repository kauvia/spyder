import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import axios from 'axios'

import Home from './components/Home'
import Activity from './components/Activity'
import Food from './components/Food'
import Settings from './components/Settings'

class Application extends Component {
    componentDidMount(){
        console.log(this.props)
        const cookies = new Cookies();
        let cookie = {hash: cookies.get('hash'), id: cookies.get('id')}
        axios.post(`/user/${this.props.store.user.email}`, {cookie})
        .then( res => {
            this.props.redux(1, res)
        })
    }
    render(){
        return(
            <div id="application">
                <header>
                    <ul>
                        <li><NavLink to={`/spyder/${this.props.store.user.email}`}>Home</NavLink></li>
                        <li><NavLink to={`/spyder/${this.props.store.user.email}/food`}>Food</NavLink></li>
                        <li><NavLink to={`/spyder/${this.props.store.user.email}/activity`}>ACTIVITY</NavLink></li>
                        <li><NavLink to={`/spyder/${this.props.store.user.email}/setting`}>setting</NavLink></li>
                    </ul>
                </header>
                <Switch>
                    <Route exact path={`/spyder/${this.props.store.user.email}`} component={ Home } />
                    <Route path={`/spyder/${this.props.store.user.email}/food`} component={ Food } />
                    <Route path={`/spyder/${this.props.store.user.email}/activity`} component={ Activity } />
                    <Route path={`/spyder/${this.props.store.user.email}/setting`} component={ Settings } />
                </Switch>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        store: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        redux: (key, data) => {
            switch (key) {
                case 1:
                    dispatch({type: 'ADD_PACKAGE', data})
                    break;
            
                default:
                    break;
            }
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Application);