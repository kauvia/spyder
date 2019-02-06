import React,{ Component } from 'react'
import { duration } from 'moment';
class ActivityHistoryItem extends Component{
    constructor(props){
        super(props)
        this.state={
            activity: this.props.activity,
            durationReps: null,

        }
    }
    componentDidMount(){
        if(this.state.activity.reps === null){
            this.setState({...this.state, durationReps: `${this.state.activity.duration} mins`})
        }else{this.setState({...this.state, durationReps: `${this.state.activity.reps} reps`})}
    }
    render(){
        return(
            <div>
                { this.state.activity.name }<br />
                { this.state.durationReps }
            </div>
        )
    }
}
export default ActivityHistoryItem