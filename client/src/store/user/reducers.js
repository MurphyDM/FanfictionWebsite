import {
    CHANGE_USER, 
    CHANGE_USER_READING_LIST
} from "./actions";

const initialState = {
    user: window.sessionStorage.getItem('user')||{},
    userReadingList: []
}

export const userReducer = (state = initialState, action) => {
    console.log('user reducer works', state, action)
    switch (action.type) {
        case CHANGE_USER:
            return {
                ...state,
                user: action.payload
            };
            case CHANGE_USER_READING_LIST:
            return {
                ...state,
                userReadingList: action.payload
            };
        default:
            return state;
    }
}
