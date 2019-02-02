import initState from './seed'

const rootReducer = (state = initState, action) => {
    if(action.type === "ADD_PACKAGE"){
        return{
            user: action.data.user,
            user_log: action.data.user_log
        }
    }
    return state
}
export default rootReducer