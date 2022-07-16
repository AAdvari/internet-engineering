import React, {useEffect, useState} from 'react';
import axios from "axios";
import SearchPageHeader from "./SearchPageHeader";
import {useSelector} from "react-redux";
import './styles/CoinDetail.css'

const baseUrl = 'https://api.coingecko.com/api/v3/coins/';

// find QueryParam from url and return
function findIdFromURL() {
    const path = window.location.pathname;
    const occurrences = path.split('/');
    return occurrences[occurrences.length - 1];
}

const CoinDetail = () => {
    const id = findIdFromURL();

    // check whether theme is dark:
    const isDark = useSelector(state => state.changeThemeReducer.darkMode);
    const bgClass = isDark ? 'dark' : 'light';
    const [detail, setDetail] = useState({});
    // set the state when the data is fetched
    useEffect(() => {
        axios.get(baseUrl + id).then(response => {
            setDetail(detail => {
                detail = response.data;
                return detail;
            })
        })
    }, []);

    /* Extract necessary fields from fetched data (if fileds are not present, return `fetching...`) */
    const getDescription = () => {
        return detail.description ? detail.description.en.replace(/<\/?a[^>]*>/g, "") : '';
    }
    const getRank = () => {
        if (!detail.market_cap_rank)
            return " Fetching Rank... ";

        return " " + detail?.market_cap_rank;
    }
    const getPrice = () => {
        if (!detail.market_data)
            return " Fetching Price... ";
        return " $ " + detail?.market_data?.current_price?.usd;
    }
    const getMarketCap = () => {
        if(!detail.market_data)
            return " Fetching Market Cap..."
        return " $ " + (detail?.market_data?.market_cap?.usd / 1000000).toFixed(3) + "M";
    }

    // if data is ready put it in historyItems :
    if (detail.name) {
        // use index to remove the least recently queried element :
        let currentIndex = parseInt(localStorage.getItem('histIndex'));
        const {items} = JSON.parse(localStorage.getItem('histItems'))
        // check duplication of coin
        if (!items.map(item=> item.name).includes(detail.name)){
            // update items :
            items[currentIndex] = {
                name: detail.name,
                price: getPrice(),
                image: detail.image
            }
            // inc index :
            currentIndex = (currentIndex + 1) % 3;
            // save data :
            localStorage.setItem('histIndex', currentIndex.toString());
            localStorage.setItem('histItems', JSON.stringify({items}));
        }
    }
    return (
        <div>
            {/*header*/}
            <SearchPageHeader/>

            {/*detail*/}
            <div className={'coin-detail text-' + bgClass + ' coin-detail-' + bgClass}>
                {/*image*/}
                <img src={detail.image?.large} alt={detail.id}/>

                {/*title*/}
                <div className={'detail-title text-' + bgClass}> {detail.name}</div>

                {/*description*/}
                <div className={'detail-description text-' + bgClass}>
                    {getDescription()}
                </div>

                {/*params and values*/}
                <div className={"param text-" + bgClass}>Rank:
                    <span className={"value text-" + bgClass}>{getRank()}</span>
                </div>

                <div className={"param text-" + bgClass}>
                    Current Price:
                    <span className={"value text-" + bgClass}>{getPrice()}</span>
                </div>
                <div className={"param text-" + bgClass}>
                    Market Cap:
                    <span
                        className={"value text-" + bgClass}>{getMarketCap()}</span>
                </div>
            </div>
        </div>
    )
}

export default CoinDetail;
