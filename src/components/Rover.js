import React, {Component} from 'react';
import PropTypes from 'prop-types';
import rover from './mars-rover.svg';

export default class Rover extends Component {
    static propTypes = {
        x: PropTypes.number,
        y: PropTypes.number,
        direction: PropTypes.string
    };

    render() {
        return <img className={"mars-rover mars-rover-" + this.props.direction} src={rover} alt="Mars rover"/>;
    }
}