import React from 'react';
import {useDispatch} from "react-redux";
import {addProductToCart} from "../../store/actions";
import {Link} from "react-router-dom";

const Product = ({productItem}) => {
    const dispatch = useDispatch();
    return (
        <div className="card h-100 w-100">
            <img className="rounded mx-auto d-block card-img-top" src={productItem.img} alt={productItem.title} style={{width:'200px', height:'200px'}} />
            <div className="card-body p-4 ">

                <div className="text-center fs-6">
                    <Link  className="text-decoration-none text-black" to={`/products/${productItem.id}`}> {productItem.title}</Link>
                    <div className="d-flex ">
                        <h3 className="me-auto fs-6"> R$  {productItem.price}</h3>
                        <h3 className="fs-6"> {productItem.size}</h3>
                    </div>
                </div>

                <div className="text-center">
                    <div className="btn btn-success d-flex justify-content-center align-content-center gap-2" onClick={()=> dispatch(addProductToCart(productItem))}>
                        Add To Cart
                        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-cart3" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Product;