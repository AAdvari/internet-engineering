const changeThemeReducer = (state= {}, action) => {

    switch (action.type){
        case 'TOGGLE_THEME':
            if(state.darkMode === undefined)
                state.darkMode = false;
            state.darkMode = !state.darkMode;
            return state;
        default:
            return state;
    }
}

export default changeThemeReducer;