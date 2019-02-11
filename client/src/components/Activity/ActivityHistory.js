import React, { Component } from 'react'
import ActivityHistoryItem from './ActivityHistoryItem'
import Calendar from 'react-calendar'
import moment from 'moment'

class ActivityHistory extends Component{
    constructor(props){
        super(props);
        this.generatelist = this.generatelist.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getDates = this.getDates.bind(this)
        this.calendarChange = this.calendarChange.bind(this)
        // this.createList = this.createList.bind(this)
        this.state = {
            searchHistory: '', dates: {}, date: new Date(), today: new Date()
        }
    }
    componentDidMount(){
        this.getDates();
    }
    // ======================================================
    //        structure dates into days using moment.js
    // ======================================================
    getDates = () => {
        let results = {}
        this.props.activities.forEach(element => {
            let string = moment(element.created_at, 'YYYYMMDD').fromNow()
            if(results[string] === undefined){
                results[string] = [element]
            }else{
                results[string].push(element)
            }
        });
        this.setState({...this.state, dates: results})
    }
    // ======================================================
    //          render Activity History
    // ======================================================
    generatelist(){
        return Object.keys(this.state.dates).map( ele => {
            return(
                <div key={ele}>
                    <p className='timestamp'>{ele}</p>
                    <ActivityHistoryItem activities={this.state.dates[ele]} />
                </div>
            )
        })
    }
    handleChange(e){
        switch (e.target.name) {
            case "search":
                this.setState({...this.state, searchHistory: e.target.value})
                break;
            case "today":
                this.setState({...this.state, date: this.state.today})
                break;
            default:
                break;
        }
    }
    calendarChange(date){
        console.log(date)

    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({...this.state, searchHistory: ''})
    }
    render(){
        return(
            <div id="activityHistory">
                Activity History<br />
                {/* SEARCH */}
                <form onSubmit = {this.handleSubmit}>
                    <input 
                        type="text" 
                        name="search"
                        onChange={this.handleChange} 
                        autocomplete="off"
                        value={this.state.searchHistory} 
                        placeholder="Search" 
                    />
                    <input type="submit" value="Search" />
                </form>
                {/* CALENDAR */}
                <div>
                    <Calendar
                    onChange={this.calendarChange}
                    value={this.state.date}
                    />
                </div>
                <div> <button name="today" onChange={this.handleChange}>Today</button> </div>
                <button onClick={ this.getDates }>get dates</button>
                {/* <form onSubmit = {this.handleSubmit}>
                    <select>
                        {this.generateOptions()}
                    </select>
                </form> */}
                =======================
                <div id="activityList">
                    { this.generatelist() }
                </div>
                
            </div>
        )
    }
}
export default ActivityHistory