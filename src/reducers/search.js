export const searchReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_SEARCH':
            return state;
        
        default: 
            return state;
    }
}

export const searchBarReducer = (state = true, action) => {
    switch(action.type) {
        case 'SEARCH_BAR':
            return true;

        case 'HIDE_SEARCH':
            return false;
            
        default:
            return state;
    }
}