import React from 'react';
import {useDispatch} from "react-redux";
import {removeProductFromCart} from "../../store/actions";

const CartItem = ({cart}) => {
    const dispatch = useDispatch();
    return (
        <div className="card ms-5 py-5 px-5 mb-3">
            <div className="ms-5 ms-sm-2 d-flex justify-content-between">
                <h5 className="fs-5 fw-bold ms-5 ms-sm-0 ">{cart.title}</h5>
                <div className="d-flex gap-5 ms-auto justify-content-between">
                    <h5 className="fs-5 fw-bold me-4 px-2">R$ {cart.price}</h5>
                    <button onClick={() => dispatch(removeProductFromCart(cart))}
                            className="btn-close ps-3"/>
                </div>


            </div>
        </div>
    )
}


export default CartItem;