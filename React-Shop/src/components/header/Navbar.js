import React from 'react';
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";
import Shop from "../utils/Shop";

const Navbar = () => {
    const totalCount = useSelector(state => state.productQtyReducer.products?.length || 0);
    return (
        <div className="d-flex justify-content-center bg-dark text-light gap-3 py-3">
            <Link to="/allproducts">
                <button className="btn border-0 text-light">
                    AllProducts
                </button>
            </Link>
            <Link to="/smartphones">
                <button className="btn border-0 text-light">
                    Smartphone
                </button>
            </Link>
            <Link to="/notebooks">
                <button className="btn border-0 text-light me-lg-5">
                    NoteBooks
                </button>
            </Link>

            <div className="ms-5">
                <Link to="/cart" className="btn btn-primary position-relative text-decoration-none justify-content-end px-4 ">
                    <div className="d-flex align-items-center gap-2">
                        <span>Cart</span>
                        <Shop />
                        {
                            totalCount?
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-black">{totalCount}</span> : ''
                        }
                    </div>
                </Link>
            </div>
        </div>
    )
}


export default Navbar;