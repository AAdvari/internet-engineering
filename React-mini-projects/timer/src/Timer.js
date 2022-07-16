import React, {Component} from 'react';
import './Timer.css';

export class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }
    render() {
        return <div className="container">
            <div className="timer">
                { this.state.counter }
            </div>
            <button onClick={this.resetCounter}>Reset Timer</button>
        </div>;
    }
    componentDidMount() {
        this.intervalId = setInterval(this.incrementTimer, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    incrementTimer = () => {
       this.setState({
           counter: this.state.counter+1
       });
    }
    resetCounter = () => {
        clearInterval(this.intervalId);
        this.setState({
            counter: 0
        });
        this.intervalId = setInterval(this.incrementTimer, 1000);
    }
}
