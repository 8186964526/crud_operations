import { GETEMPLOYEES , TODOINFO  } from '../actions/index';
let date = [];
export const Employeereducer = (state = date , action) => {
    switch (action.type) {
             case GETEMPLOYEES :
             return Object.assign({}, state, { data: action.payload});
             case TODOINFO : 
             return Object.assign({}, state, { todo: action.payload});
             default:
             return state;
    }
}
