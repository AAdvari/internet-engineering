import React from 'react';
import {useSelector} from "react-redux";
import './styles/ListRow.css';
import Link from "react-router-dom/es/Link";

const ListRow = ({item}) => {
    const isDark = useSelector(state => state.changeThemeReducer.darkMode);
    const bgClass = isDark ? 'dark' : 'light';
    const percentageColor = item.price_change_percentage_24h > 0 ? 'darkgreen' : 'darkred';

    return (
        <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color:'unset'}}>

            <div className={'row row-' + bgClass}>
                <div className={'w4 item item-' + bgClass}>
                    <img src={item.image} alt={item.id}/>
                    <div className={'coin-info'}>
                        <div className={'coin-title'}>{item.symbol.toUpperCase()}</div>
                        <div className={'coin-name'}>{item.name}</div>
                    </div>
                </div>
                <div className={'w2 item item-' + bgClass}>${item.current_price}</div>
                <div className={'w2 item item-' + bgClass}>

                <span style={{color: percentageColor}}>
                    {percentageColor === 'darkgreen' ? '+' : ''}{item.price_change_percentage_24h}%
                </span>

                </div>
                <div className={'w2 item item-' + bgClass}>${(item.market_cap / 1000000).toFixed(3)}M</div>
            </div>
        </Link>
    )
}

export default ListRow;