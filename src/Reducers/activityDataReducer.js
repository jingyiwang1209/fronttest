import { ADD_ACTIVITY_DATA, FETCH_ACTIVITY_DATA, ACTIVITY_ERROR, HANDLE_LIKES } from "../Actions/types";
import _ from 'lodash';

const INITIAL_STATE = { all:[], message:"", error:"", likes:{} };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ACTIVITY_DATA:
            return { ...state, message : action.payload };
        case FETCH_ACTIVITY_DATA:
            return { ...state, all: action.payload }
        case ACTIVITY_ERROR:
            return { ...state, error : action.payload }
        case HANDLE_LIKES:
             return { ...state, likes : action.payload }
    }

    return state;

};