import React from 'react';
import './styles/HomePage.css';
import {useDispatch, useSelector} from "react-redux";
import {toggleTheme} from "../store/actions";
import Link from "react-router-dom/es/Link";
import HistoryItem from "./HistoryItem";

// this Component Renders HomePage :
const HomePage = () => {
    // check whether theme is dark :
    const isDark = useSelector(state => state.changeThemeReducer.darkMode);
    const bgClass = isDark ? 'dark' : 'light';
    const dispatch = useDispatch();

    // get history items from localStorage:
    const {items} = JSON.parse(localStorage.getItem('histItems'))

    return (
        <div className={"homepage background-" + bgClass}>
            {/* Col 1 */}
            <div className="hp-col1">
                <div className={"title-text title-text-" + bgClass}>
                    Search & <br/>
                    Buy <span className={"orange-text orange-text-" +bgClass}>Crypto</span>
                </div>
                <div className={"description-text description-text-" +bgClass}>
                    Shahid Beheshti University <br/>
                    IE Final Project
                </div>
                <button className={"search-more search-more-" + bgClass}>
                    <Link to='search' style={{textDecoration:'none', color:'inherit'}}>
                        SEARCH MORE
                    </Link>
                </button>
            </div>
            {/* Col 2 */}
            <div className="hp-col2">
                <div className="col2-content">
                    <button className={"col2-change-theme col2-change-theme-" + bgClass}
                            onClick={() => dispatch(toggleTheme())}
                    > Change Theme
                    </button>
                </div>
                <div className={'hist-list'}>
                    {
                        items.map((item, index) =>
                            item.name?
                                <HistoryItem key={index} item={item} />: null )
                    }
                </div>
            </div>
        </div>
    )
}


export default HomePage;