import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./CartItem";
import {clearAll} from "../../store/actions";


const Cart = () => {
    const prods = useSelector(state => state.productQtyReducer.products);
    const totalPrice = useSelector(state => state.productQtyReducer.totalPrice);
    const dispatch = useDispatch();
    return (
        <div className="p-5 mx-2">
            <div className="d-flex flex-column mx-3 p-5">
                {
                    prods?.length ?
                        prods.map(cart => <CartItem cart={cart}/>)
                        :
                        <div className="fw-bold px-5 text-center fs-3"> List is empty! </div>
                }
                <div className="mx-5 fs-3 fw-bold align-self-end">
                    Total: R$ {totalPrice || 0}
                </div>
                {
                    prods?.length ?
                        <button onClick={() => dispatch(clearAll())}
                                className="mx-5 px-4 btn btn-info align-self-start text-white">checkout</button>
                        : ''
                }
            </div>

        </div>

    )
}

export default Cart;