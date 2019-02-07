import React, { Component } from 'react'
import ActivityHistoryItem from './ActivityHistoryItem'
import moment from 'moment'

class ActivityHistory extends Component{
    constructor(props){
        super(props);
        this.generatelist = this.generatelist.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getDates = this.getDates.bind(this)
        // this.createList = this.createList.bind(this)
        this.state = {
            searchHistory: '', filteredList: null, dates: {}
        }
    }
    componentDidMount(){
        this.getDates();
    }
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
    generatelist = () => {
        return Object.keys(this.state.dates).map( ele => {
            return(
                <div key={ele}>
                    <p className='timestamp'>{ele}</p>
                    <ActivityHistoryItem activities={this.state.dates[ele]} />
                </div>
            )
        })
    }
    modelFilter = () => {
        console.log(this.props.store)
    }
    handleChange = (e) => {
        this.setState({...this.state, searchHistory: e.target.value})
        this.modelFilter(e.target.value)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let filteredList = this.props.activities.filter( ele => {
            return(
                ele.name.toLowerCase().replace(' ', '').includes(this.state.searchHistory.toLowerCase().replace(' ', ''))
            )
        })
        this.setState({...this.state, searchHistory: '', filteredList: filteredList})
    }
    render(){
        return(
            <div id="activityHistory">
                Activity History<br />
                <form onSubmit = {this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} value={this.state.searchHistory} placeholder="Search" />
                    <input type="submit" value="Search" />
                </form>
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