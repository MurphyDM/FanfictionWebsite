import {
    CHANGE_USER
} from "./actions";

const initialState = {
    user: {}
}

export const userReducer = (state = initialState, action) => {
    console.log('user reducer works', state, action)
    switch (action.type) {
        case CHANGE_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
