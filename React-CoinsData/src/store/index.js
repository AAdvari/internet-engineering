import {createStore, combineReducers } from "redux";
import changeThemeReducer from "./reducers/changeThemeReducer";

const allReducers = combineReducers({
    changeThemeReducer
});

const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;

