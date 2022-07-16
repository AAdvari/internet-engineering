import React from 'react';
import {useSelector} from "react-redux";
import './styles/HistoryItem.css'
// This Component renders one history item :
const HistoryItem = ({item}) => {

    // Add dark Styles :
    const isDark = useSelector(state => state.changeThemeReducer.darkMode);
    const bgClass = isDark ? 'dark' : 'light';
    return (
        <div className={'hist-item hist-item-'+bgClass}>
            <img className={'hist-image'} src={item.image.small}   alt='coin-img'/>
            <div className={'hist-brief'}>
                <div className={'hist-price hist-price-'+bgClass}>
                    {item.price}
                </div>
                <div className={'hist-name hist-name-'+bgClass}>
                    {item.name}
                </div>
            </div>

        </div>
    );
}

export default HistoryItem;