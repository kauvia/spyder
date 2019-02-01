import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, Switch, Route, withRouter } from 'react-router-dom'

import Home from './components/Home'
import Activity from './components/Activity'
import Food from './components/Food'
import Settings from './components/Settings'

class App extends Component {
  componentDidMount(){
    console.log(this.props.store)
  }
  render() {
    return (
      <div className="App">
        <header>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/food'>Food</NavLink></li>
            <li><NavLink to='/activity'>ACTIVITY</NavLink></li>
            <li><NavLink to='/settings'>setting</NavLink></li>
          </ul>
        </header>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/food' component={ Food } />
          <Route path='/activity' component={ Activity } />
          <Route path='/settings' component={ Settings } />
        </Switch>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      store: state
  }
}
export default withRouter(connect(mapStateToProps)(App));
