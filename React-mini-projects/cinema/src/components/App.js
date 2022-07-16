import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";

export default function App() {
    const [movies, setMovies] = useState([]);


    const fetchAndSet = async (abortCont) => {
        const fetchedData = await fetch('http://localhost:9000/movies', {signal: abortCont.signal});
        const fetchedMovies = await fetchedData.json();
        setMovies(fetchedMovies);
    }

    useEffect( () => {
        const abortCont = new AbortController();
        fetchAndSet(abortCont).catch(() => console.log("Fetching data confronted with errors!"));
        return () => abortCont.abort();
    }, []);

    return (
        <Router>
            <div className="app">

                <Switch>
                    <Route exact path="/">
                        <MovieList movies={movies} />
                    </Route>

                    <Route exact path="/movies/:id" >
                        <MovieDetail />
                    </Route>

                </Switch>
            </div>
        </Router>
    );
}
