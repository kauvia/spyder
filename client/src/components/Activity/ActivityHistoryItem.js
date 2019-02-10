import React,{ Component } from 'react'
class ActivityHistoryItem extends Component{
    constructor(props){
        super(props)
        this.state={
            datedList: props.activities
        }
        this.generateList = this.generateList.bind(this)
    }
    generateList = () => {
        return this.state.datedList.map(ele => {
            let activityLength;
            if(ele.reps === null){activityLength = ele.duration}else{activityLength = ele.reps}
            return(
                <p key={ele.id}>
                    {ele.name} {activityLength}
                </p>
            )   
        })
    }
    render(){
        return(
            <div>
                {this.generateList()}
            </div>
        )
    }
}
export default ActivityHistoryItem