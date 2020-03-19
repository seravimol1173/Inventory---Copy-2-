import axios from 'axios';

export const GET_ALL_ITEMS_REQUEST = 'GET_ALL_ITEMS_REQUEST';
export const GET_ALL_ITEMS_SUCCESS = 'GET_ALL_ITEMS_SUCCESS';
export const GET_ALL_ITEMS_ERROR = 'GET_ALL_ITEMS_ERROR';

const getItemsSuccess = payload => ({
    type: GET_ALL_ITEMS_SUCCESS,
    payload
});

const getItemsError = payload => ({
    type: GET_ALL_ITEMS_ERROR,
    payload
});

export const getAllItems = () => dispatch => {
    dispatch({type: GET_ALL_ITEMS_REQUEST});
    return axios.get('api/Items/GetItems').then(res => {
        const response = res.data;
        dispatch(getItemsSuccess(response));
            }).catch(error => {
                dispatch(getItemsError("Something went wrong!"));
                return Promise.reject({});
            })
}