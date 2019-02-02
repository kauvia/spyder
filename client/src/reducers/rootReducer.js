import initState from './seed'

const rootReducer = (state = initState, action) => {
    if(action.type === "ADD_PACKAGE"){
        return{
            user: action.data.user,
            user_log: action.data.user_log
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
    return state
}
export default rootReducer