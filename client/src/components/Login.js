import React, { Component } from 'react'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({...this.state, email:'', password: ''})
    }
    handleChange = (e) => {
        if(e.target.name === "email"){
            this.setState({ ...this.state, email: e.target.value })
        }else if(e.target.name === "password"){
            this.setState({ ...this.state, password: e.target.value })
        }
    }
    render(){
        return(
            <div id="login">
                <form id="loginForm" onSubmit={this.handleSubmit}>
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email}></input>
                    <input type="text" name="password" onChange={this.handleChange} value={this.state.password}></input>
                    <input type="submit" value="log in"></input>
                </form>
                <a href='/spyder/jon'>LOGIN</a>
            </div>
        )
    }
}
export default Login