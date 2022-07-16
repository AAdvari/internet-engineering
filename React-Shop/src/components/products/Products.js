import React from 'react';
import Product from "../product/Product";

const Products = ({productItems}) => {
    return (
        <div className="container p-5">
            <div className="row  row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {productItems.map(productItem =>
                    <div key={productItem.id} className="col-4 mb-5"> <Product productItem={productItem}/></div>
                )}
            </div>
        </div>
    )
}


export default Products;