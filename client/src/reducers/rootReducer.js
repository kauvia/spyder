import initState from './seed'
import moment from 'moment'

const rootReducer = (state = initState, action) => {
    if(action.type === "ADD_PACKAGE"){
        //init moment object
        const exercises = action.data.exercise.map((exercise)=>{
            let created_at = moment(exercise.created_at)
            exercise.created_at = created_at
            return exercise;
        });
        return{
            ...state,
            user_log: {
                ...state.user_log,
                exercise:exercises,
                food: action.data.food
            }
        }
    }
    if(action.type === "ADD_DATE"){
        return{
            ...state,
            date: action.data
        }
    }
    if(action.type === "ADD_FOOD_LOG"){
        return{
            ...state,
            user_log: [
                ...state.user_log,
                action.data
            ]
        }
    }
    if(action.type === "ADD_ACTIVITY"){
        let exercises = state.user_log.exercise
        exercises.unshift(action.data)
        return{
            ...state,
            user_log: {
                ...state.user_log,
                exercise: exercises
            }
        }
    }
    return state
}
export default rootReducer