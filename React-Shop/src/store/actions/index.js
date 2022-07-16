export const addProductToCart = (product) => {
    return {
        type: "ADD_TO_CART",
        payload: product
    };
};

export const removeProductFromCart = (product) => {
    return {
        type: "REMOVE_FROM_CART",
        payload: product
    }
};

export const clearAll = () => {
    return {
        type: 'CLEAR_ALL'
    }
}