import {combineReducers} from 'redux';
import itemReducers from './itemReducers';


const rootReducer = combineReducers({
    items: itemReducers
});

export default rootReducer;