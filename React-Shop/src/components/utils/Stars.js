import React from 'react';

const Star = ({size, color}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill={color} className="bi bi-star-fill"
             viewBox="0 0 16 16">
            <path
                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    )
}

const Stars = ({rate}) =>{
    const stars = [];
    for(let i=0; i < rate; i++)
        stars.push('orange');
    for(let i=0; i < 5-rate; i++)
        stars.push('lightgray');

    return (

        <div className="d-flex flex-column justify-content-center">
            <div className="d-flex gap-2">
                {
                    stars.map((item,index) =>
                        item==='orange' ?
                            <div key={index}> <Star size={32} color='orange' /> </div>
                            :
                            <div key={index}><Star size={32} color='lightgray' /> </div> )
                }
            </div>
        </div>
    )
}

export default Stars;
