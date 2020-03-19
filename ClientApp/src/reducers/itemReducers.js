import {
    GET_ALL_ITEMS_REQUEST,
    GET_ALL_ITEMS_SUCCESS,
    GET_ALL_ITEMS_ERROR
} from '../Actions/itemsActions'


const INITIAL_STATE = {
    loading: false,
    hasError: false,
    error: false,
    data:[]
}

export default(state = INITIAL_STATE, action ) => {
    switch(action.type){
        case GET_ALL_ITEMS_REQUEST:
            return{
                ...state,
                loading: true
            };
        case GET_ALL_ITEMS_SUCCESS:
            return{
                ...state,
                loading: false,
                hasError: false,
                data: action.payload
            };
        case GET_ALL_ITEMS_ERROR:
            return{
                ...state,
                loading: false,
                hasError: true,
                data: action.payload

            };
        default: 
            return state;

    }
}