import { combineReducers } from 'redux';
import { Employeereducer } from './Employeereducer';
 const appReducer = combineReducers({
    reducer : Employeereducer
})
export default appReducer

