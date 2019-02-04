import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Application from './components/Application'
import Login from './components/Login'
import './App.css'


class App extends Component {
  componentDidMount(){
    // console.log(this.props.store)
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/login' component={ Login } />
            <Route path='/' component={ Application } />
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
