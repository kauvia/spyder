import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Main from './components/main/main'
import Login from './components/login/Login'
import './App.css'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/login' component={ Login } />
            <Route path='/' component={ Main } />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
      store: state
  }
}
export default connect(mapStateToProps)(App);
