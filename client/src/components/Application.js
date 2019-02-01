import React, { Component } from 'react'
import { NavLink, Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './components/Home'
import Activity from './components/Activity'
import Food from './components/Food'
import Settings from './components/Settings'

class Application extends Component {
    componentDidMount(){
        console.log(this.props.store)
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
export default withRouter(connect(mapStateToProps)(Application));