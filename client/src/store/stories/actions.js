export const CHANGE_STORIES = 'CHANGE_STORIES';
export const CHANGE_NEWEST_STORIES = 'CHANGE_NEWEST_STORIES';
export const CHANGE_FANTASY_STORIES = 'CHANGE_FANTASY_STORIES';
export const CHANGE_ROMANCE_STORIES = 'CHANGE_ROMANCE_STORIES';
export const CHANGE_ADVENTURES_STORIES = 'CHANGE_ADVENTURES_STORIES';
export const CHANGE_ORIGINAL_STORIES = 'CHANGE_ORIGINAL_STORIES';

export const setNewestStories = (stories) => ({
  type: CHANGE_NEWEST_STORIES,
  payload: stories
});

export const setRomanceStories = (stories) => ({
  type: CHANGE_ROMANCE_STORIES,
  payload: stories
});

export const setFantasyStories = (stories) => ({
  type: CHANGE_FANTASY_STORIES,
  payload: stories
});

export const setAdventuresStories = (stories) => ({
  type: CHANGE_ADVENTURES_STORIES,
  payload: stories
});

export const setOriginalStories = (stories) => ({
  type: CHANGE_ORIGINAL_STORIES,
  payload: stories
});
