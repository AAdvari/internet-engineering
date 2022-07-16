import React from 'react';
import './styles/SearchPageTile.css';
import {useSelector} from "react-redux";
// this component renders the tile of search page ( under the header )
const SearchPageTile = () => {
    // Check whether theme is dark :
    const isDark = useSelector(state => state.changeThemeReducer.darkMode);
    const bgClass = isDark ? 'dark' : 'light';
    return (
        <div className={'search-page-tile search-page-tile-'+bgClass}>
            <div className={'spt-header-text'}> Search Coin </div>
            <div className={'spt-inf-text'}> Get information From Here</div>
        </div>
    )
}


export default SearchPageTile;