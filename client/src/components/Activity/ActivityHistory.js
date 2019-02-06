import React, { Component } from 'react'
import ActivityHistoryItem from './ActivityHistoryItem'

class ActivityHistory extends Component{
    constructor(props){
        super(props);
        this.generatelist = this.generatelist.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            searchHistory: ''
        }
    }
    generatelist = () => {
        if(this.props.activities !== undefined){
            return (this.props.activities.map( ele => {
                return(
                    <ActivityHistoryItem activity={ele}/>
                )
            }))
            // return (<div>fdsfsdfs</div>)
        }else{
            return(
                <div><loading className=""></loading></div>
            )
        }
    }
    handleChange = (e) => {
        this.setState({...this.state, searchHistory: e.target.value})
    }
    render(){
        return(
            <div id="activityHistory">
                Activity History<br />
                <form>
                    <input type="text" onChange={this.handleChange} value={this.state.searchHistory} placeholder="Search" />
                    <input type="submit" onChange={this.handleSubmit} value="Search" />
                </form>
                =======================
                { this.generatelist() }
            </div>
        )
    }
}
export default ActivityHistory