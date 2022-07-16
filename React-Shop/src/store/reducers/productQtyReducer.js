const productQtyReducer = (state = {}, action) => {
    const product = action.payload;
    switch (action.type) {
        case 'ADD_TO_CART':
            if(!state.products)
                state.products = [];
            if(!state.totalPrice)
                state.totalPrice = 0;
            state.products.push(product);
            state.totalPrice += product.price;
            return state;
        case 'REMOVE_FROM_CART':
            if(!state.products)
                state.products = [];
            if(!state.totalPrice)
                state.totalPrice = 0;
            console.log(state.products.indexOf(product))
            state.products.splice(state.products.indexOf(product), 1);
            state.totalPrice-= product.price;
            return state;
        case 'CLEAR_ALL':
            state.products = [];
            state.totalPrice = 0;
            return state;
        default:
            return state;
    }
}

export default productQtyReducer;
