import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.test= this.test.bind(this)
  }


  test(){
    fetch("/rice").then(val=>val.json().then(val=>console.log(val)))
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.test}></button>
      </div>
    );
  }
}

export default App;
