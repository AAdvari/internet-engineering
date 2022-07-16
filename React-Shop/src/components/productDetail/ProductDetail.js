import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import DetailModal from "./DetailModal";
import Stars from "../utils/Stars";
import Shop from "../utils/Shop";
import {addProductToCart} from "../../store/actions";
import {useDispatch} from "react-redux";

const ProductDetail = ({productItems}) => {
    const dispatch = useDispatch();
    const [infoShowState, setInfoShowState] = useState(false);
    const handleModalClose = () => {
        setInfoShowState(false);
    }
    const {id} = useParams();
    const productItem = productItems.find(item => item.id === parseInt(id))
    return (

        <div>
            <div className="d-flex justify-content-center">
                <div className="d-inline-flex gap-5 justify-content-evenly bg-light my-5 px-5 ">
                    <div>
                        <img className="mb-3" src={productItem.img} alt={productItem.title}/>
                        <Stars rate={1}/>
                        <div className="text-start mt-3 fs-5">
                            1 Review
                        </div>
                    </div>

                    <div>
                        <div className="d-inline-flex flex-column  fs-6 my-4 ">
                            <h4 className="w-75"> {productItem.title}</h4>
                            <h1 className="mt-3 fw-bold fs-3 mb-3"> R$ {productItem.price}</h1>

                            <button
                                className="btn btn-success  mb-2" style={{width: '60%'}}
                                onClick={() => dispatch(addProductToCart(productItem))}> Buy Now <Shop/>
                            </button>

                            <button className="btn btn-info text-white" style={{width: '60%'}}
                                    onClick={() => setInfoShowState(true)}> More info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DetailModal showState={infoShowState} detail={productItem.detail} handleClose={handleModalClose}/> : <div/>

        </div>
    )
}


export default ProductDetail;