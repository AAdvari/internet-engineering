import {createStore, combineReducers } from "redux";
import productQtyReducer from "./reducers/productQtyReducer";

const allReducers = combineReducers({
    productQtyReducer
});

const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;