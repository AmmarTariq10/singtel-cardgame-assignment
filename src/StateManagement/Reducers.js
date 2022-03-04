import { combineReducers } from 'redux'
import GeneralReducer from './GeneralReducer';
const Reducers = combineReducers({
    GeneralReducer: GeneralReducer,
})
export default Reducers;