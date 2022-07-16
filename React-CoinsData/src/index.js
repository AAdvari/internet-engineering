import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));
if (!localStorage.getItem('histItems')){
    localStorage.setItem('histIndex', '0');
    localStorage.setItem('histItems', JSON.stringify({items: [{}, {},{}]}));
}
let render = () => {
    root.render (
        <BrowserRouter>
            <React.StrictMode>
                {/* we should put our <App/> in redux provider with our created store as a param */}
                <Provider store={store} >
                    <App />
                </Provider>
            </React.StrictMode>
        </BrowserRouter>
    )
}

store.subscribe(render);
render();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
