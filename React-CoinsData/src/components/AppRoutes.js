import React from 'react';
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import CoinDetail from "./CoinDetail";
import {Route, Switch} from "react-router-dom";

// Declare different endpoints of the app using react-router
const AppRoutes =  () => {
    return (
        <Switch>
            {/*homePage*/}
            <Route exact path='/' >
                <HomePage />
            </Route>

            {/*searchPage*/}
            <Route exact path='/search' >
                <SearchPage />
            </Route>
            {/*coinDetailPage*/}
            <Route exact path='/detail/:id'>
                <CoinDetail />
            </Route>
        </Switch>
    )
}


export default AppRoutes;