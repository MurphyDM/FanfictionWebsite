import {
    CHANGE_NEWEST_STORIES
} from "./actions";

const initialState = {
    newestStories: []
}

export const storiesReducer = (state = initialState, action) => {
    console.log('stories reducer works', state, action)
    switch (action.type) {
        case CHANGE_NEWEST_STORIES:
            console.log(action.payload);
            return {
                ...state,
                newestStories: action.payload
            };

        default:
            return state;
    }
}
