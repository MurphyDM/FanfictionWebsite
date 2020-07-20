import {
    CHANGE_NEWEST_STORIES,
    CHANGE_FANTASY_STORIES,
    CHANGE_ROMANCE_STORIES,
    CHANGE_ADVENTURES_STORIES,
    CHANGE_ORIGINAL_STORIES
} from "./actions";

const initialState = {
    newestStories: [],
    fantasyStories: [],
    romanceStories: [],
    adventuresStories: [],
    originalStories: []
}

export const storiesReducer = (state = initialState, action) => {
    console.log('stories reducer works', state, action)
    switch (action.type) {
        case CHANGE_NEWEST_STORIES:
            return {
                ...state,
                newestStories: action.payload
            };
        case CHANGE_FANTASY_STORIES:
            return {
                ...state,
                fantasyStories: action.payload
            };
        case CHANGE_ADVENTURES_STORIES:
            return {
                ...state,
                adventuresStories: action.payload
            };
        case CHANGE_ROMANCE_STORIES:
            return {
                ...state,
                romanceStories: action.payload
            };
        case CHANGE_ORIGINAL_STORIES:
            return {
                ...state,
                originalStories: action.payload
            };

        default:
            return state;
    }
}
