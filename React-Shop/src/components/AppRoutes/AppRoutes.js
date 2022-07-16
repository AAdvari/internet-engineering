import React from 'react';
import {Route, Switch} from "react-router-dom";
import Products from "../products/Products";
import Cart from "../cart/Cart";
import ProductDetail from "../productDetail/ProductDetail";


const AppRoutes = ({productItems}) => {
    return (
        <div>
                <Switch>
                    <Route exact path='/' >
                        <Products productItems={productItems} />
                    </Route>

                    <Route exact path='/allproducts' >
                        <Products productItems={productItems} />
                    </Route>

                    <Route exact path='/smartphones'>
                        <Products productItems={productItems.filter(item=> item.category==='smartphone')} />
                    </Route>

                    <Route exact path='/notebooks'>
                        <Products productItems={productItems.filter(item => item.category==='notebook')} />
                    </Route>

                    <Route exact path='/cart' >
                        <Cart />
                    </Route>

                    <Route exact path='/products/:id' >
                        <ProductDetail productItems={productItems} />
                    </Route>

                </Switch>
        </div>
    )
}


export default AppRoutes;