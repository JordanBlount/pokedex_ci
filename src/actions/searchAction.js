const SET_SEARCH = "SET_SEARCH";
const SHOW_SEARCH = "SHOW_SEARCH";
const HIDE_SEARCH = "HIDE_SEARCH";

export const updateSearch = (name) => {
    return {
        type: SET_SEARCH,
        payload: name
    }
}

export const showSearchBar = () => {
    return {
        type: SHOW_SEARCH,
        payload: true
    }
}

export const hideSearchBar = () => {
    return {
        type: HIDE_SEARCH,
        payload: false
    }
}
