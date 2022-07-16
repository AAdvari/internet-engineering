import React, {useEffect, useState} from 'react';
import './styles/SearchPageList.css';
import axios from 'axios';
import ListRow from "./ListRow";
import {useSelector} from "react-redux";

const baseUrl = 'https://api.coingecko.com/api/v3/coins/markets';
// default parameters of api call
const defaultParams = {
    count: 4,
    page: 1,
    currency: 'usd',
    order: 'market_cap_desc',
    changePercentage: '24h'
};

const SearchPageList = () => {
    const isDark = useSelector(state => state.changeThemeReducer.darkMode);
    const bgClass = isDark ? 'dark' : 'light';
    const [items, setItems] = useState([]);
    const [searchBar, setSearchBar] = useState('');

    // function gets the api response based on given params and returns promise :
    function getAndSetItems({search, count, page, currency, order, changePercentage}) {
        const reqUrl = baseUrl +
            `?vs_currency=${currency}` +
            (search ? `&ids=${search}` : ``) +
            `&order=${order}` +
            `&per_page=${count}` +
            `&page=${page}` +
            `&price_change_percentage=${changePercentage}`;
        return axios.get(reqUrl);
    }
    // when searchBar text changes, a new api-call should be executed.
    useEffect(() => {
        getAndSetItems({...defaultParams, search: searchBar})
            .then(response => setItems(items => {
            items = response.data;
            return items;
        }));
    }, [searchBar]);

    return (

        <div className={'spl spl-' + bgClass}>
            {/*// the text above the search box */}
            <div className={'search-header search-header-' + bgClass}>
                CryptoCurrency Prices by Market Cap
            </div>

            {/*search box */}
            <div className={'search-box search-box-' + bgClass}>
                <input onChange={(e) => setSearchBar(e.target.value)}
                       type='text'
                       placeholder='Search For a Crypto Currency'/>
            </div>
            {/*header row*/}
            <div className={'header-row header-row-' + bgClass}>
                <div className={'w4 header-item header-item' + bgClass}>Coin</div>
                <div className={'w2 header-item header-item-' + bgClass}>Price</div>
                <div className={'w2 header-item header-item-' + bgClass}>24h Change</div>
                <div className={'w2 header-item header-item-' + bgClass}>Market Cap</div>
            </div>
            {/* rows */}
            <div className={'rows rows-' + bgClass}>
                {
                    items.map((item, index) => <ListRow key={index} item={item}/>)
                }
            </div>

        </div>
    )
}


export default SearchPageList;


