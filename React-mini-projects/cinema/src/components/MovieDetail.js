import React from 'react';
import notFound from "./NotFound";

export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {}
        }
    }

    abortCont = new AbortController();
    async fetchAndSet(id){
        const fetchedData = await fetch(`http://localhost:9000/movies/${id}`,
            {signal: this.abortCont.signal}
        );
        const fetchedDetail = await fetchedData.json();
        this.setState({ movie: fetchedDetail });
    }
    findIdFromURL(){
        const path = window.location.pathname;
        return parseInt(path.match(/(\d)+/)[0]);
    }
    componentDidMount() {
        const  id  = this.findIdFromURL();
        this.fetchAndSet(id).catch(
            () => console.log("Fetching Data from api confronted with errors")
        );
    }

    componentWillUnmount() {
        this.abortCont.abort();
    }

    render() {
        return (
            this.state.movie.banner ?
            <div className='movie-detail container'>
                <img className='movie-banner' src={this.state.movie.banner} alt=""/>
                <div className="detail-body">
                    <div>
                        <h2 className="card-title">{this.state.movie.title}
                            <span className='release-year'> {this.state.movie.release_year}</span>
                        </h2>
                        <div className='detail-description'>
                            <p className='card-description'>{this.state.movie.description}</p>
                        </div>
                    </div>
                    <div className='images'>
                        <img className='detail-img' src={this.state.movie.image} alt=""/>
                    </div>
                </div>
            </div>
                :
            <div> {notFound()}</div>
        )
    }
}
