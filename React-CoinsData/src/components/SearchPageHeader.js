import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./styles/SearchPageHeader.css"
import {toggleTheme} from "../store/actions";

// this component renders header of searchPage ( PageTitle and change theme )
const SearchPageHeader = () => {

    // Check whether the theme is dark :
    const isDark = useSelector(state => state.changeThemeReducer.darkMode);
    const bgClass = isDark ? 'dark' : 'light';
    const dispatch = useDispatch();
    return (
        <div className={'nav nav-' + bgClass}>
            <div className={'nav-item-text nav-item-text-' + bgClass}>
                IE Final Project
            </div>
            {/* onClick function dispatches toggleTheme action */}
            <div onClick={() => dispatch(toggleTheme())}
                 className={'sp-change-theme sp-change-theme-' + bgClass}> Change Theme
            </div>
        </div>
    )
}

export default SearchPageHeader;
