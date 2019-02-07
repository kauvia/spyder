import React, { Component } from 'react'
import { connect } from 'react-redux'
import { api } from '../functions'
import AllowanceContainer from '../Allowance-Container/AllowanceContainer'

class EditStats extends Component {
    constructor(props) {
        super(props)
    }

    // componentDidUpdate() {
    //     if (this.props.showEditForm === true) {
    //     }
    // }

    render() {
        return (
                <div>
                    <form method="POST" action="/stats/'+stat.id+'?_method=PUT">
                        Height: <input name="height" type="text" value="'+stat.height+'"/><br />
                        Weight: <input name="weight" type="text" value="'+stat.weight+'"/><br />
                        Target Weight: <input name="targetWeight" type="text" value="'+stat.target_weight+'"/><br />
                        Activity Level: <input name="activityLevel" type="text" value="'+stat.activity_level+'"/>
                    </form>
                </div>
            )
    }

}

export default EditStats;