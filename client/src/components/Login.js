import React, { Component } from 'react'
import axios from 'axios'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            sEmail: '', sPassword: '', sPasswordConfirm: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.check = this.check.bind(this)
    }
    componentDidMount(){
        console.log(this.check('passwordConfirm'))
    }
    check = (type) => {
        switch (type) {
            case 'passwordConfirm':
                if(this.state.sPassword === this.state.sPasswordConfirm){
                    return true
                }else {return false};
            default:
                return false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(e.target.id === "loginForm"){
            axios.post('/', {email: this.state.email, password: this.state.password})
            .then( res => {console.log(res)})   // RECEIVE INFO - REDIRECT TO HOME PAGE
            this.setState({...this.state, email:'', password: ''})
        }else if(e.target.id === "signUpForm"){
            if(this.check('passwordConfirm')){
                axios.post('/signup', {email: this.state.eEmail, password: this.state.sPassword})
                .then( res => {console.log(res)})   // RECEIVE INFO - REDIRECT TO NEW HOME PAGE
                                                    // WRONG INFO - ERROR MESSAGE
                this.setState({...this.state, sEmail:'', sPassword: '', sPasswordConfirm: ''})
            }else{ this.setState({...this.state, sEmail:'', sPassword: '', sPasswordConfirm: ''}) }
        }
    }
    handleChange = (e) => {
        if(e.target.name === "email"){
            this.setState({ ...this.state, email: e.target.value })
        }else if(e.target.name === "password"){
            this.setState({ ...this.state, password: e.target.value })
        }else if(e.target.name === "sEmail"){
            this.setState({ ...this.state, sEmail: e.target.value })
        }else if(e.target.name === "sPassword"){
            this.setState({ ...this.state, sPassword: e.target.value })
        }else if(e.target.name === "sPasswordConfirm"){
            this.setState({ ...this.state, sPasswordConfirm: e.target.value })
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
                <form id="signUpForm" onSubmit={this.handleSubmit}>
                    <input type="text" name="sEmail" onChange={this.handleChange} value={this.state.sEmail}></input>
                    <input type="text" name="sPassword" onChange={this.handleChange} value={this.state.sPassword}></input>
                    <input type="text" name="sPasswordConfirm" onChange={this.handleChange} value={this.state.sPasswordConfirm}></input>
                    <input type="submit" value="sign up"></input>
                </form>
                <a href='/spyder/jon@gmail.com'>LOGIN</a>
            </div>
        )
    }
}
export default Login