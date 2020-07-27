export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_USER_READING_LIST = 'CHANGE_USER_READING_LIST'

export const setUser = (user) => ({
  type: CHANGE_USER,
  payload: user
});

export const changeUserReadingList = (readingList) => ({
  type: CHANGE_USER_READING_LIST,
  payload: readingList
});
