import React from 'react';
import './styles/SearchPage.css';
import SearchPageTile from "./SearchPageTile";
import SearchPageList from "./SearchPageList";
import SearchPageHeader from "./SearchPageHeader";
import {useSelector} from "react-redux";

// Component renders SearchPage :
const SearchPage = () => {
    const isDark = useSelector(state => state.changeThemeReducer.darkMode);
    const bgClass = isDark ? 'dark' : 'light';

    return (
        <div className={'search-page search-page-' + bgClass}>
            <SearchPageHeader />
            <SearchPageTile />
            <SearchPageList />
        </div>
    )
}


export default SearchPage;