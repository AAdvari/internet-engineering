import React from 'react';
import { Link } from "react-router-dom";

export default class MovieCard extends React.Component {
    render() {
        return (
            <div className='movie-card'>
                <img className="card-img" src={this.props.movie.imageUrl} alt=""/>
                <div className="card-body">

                    <a href={`/movies/${this.props.movie.id}`}>
                        <h2 className="card-title">{this.props.movie.title}</h2>
                    </a>
                    <p className='card-description'>{this.props.movie.short_description}</p>
                </div>
            </div>
        )
    }
}