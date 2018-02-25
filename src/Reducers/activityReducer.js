import {
    ADD_ACTIVITY_DATA,
    FETCH_ACTIVITY_DATA,
    ACTIVITY_ERROR,
    HANDLE_LIKES,
    FETCH_ONE_ACTIVITY,
} from "../Actions/types";


const INITIAL_STATE = { all: [], message: "", error: "" };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ACTIVITY_DATA:
            return { ...state, message: action.payload };
        case FETCH_ACTIVITY_DATA:
            return { ...state, all: action.payload };
        case ACTIVITY_ERROR:
            return { ...state, error: action.payload };
        case HANDLE_LIKES:
             const activityId = Object.keys(action.payload)[0]
             const numOfLikes = Object.values(action.payload)[0]
             const newAll = state.all.map((activity)=>{
                 if(activity.id == activityId){
                    activity.likes = numOfLikes;
                 }
                 return activity;
             })
             return {...state, all: newAll};
        case FETCH_ONE_ACTIVITY:
            return { ...state, activity: action.payload, message:""};
    }

    return state;
};