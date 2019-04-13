import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {isObstacle} from '../utils/rover';

import Rover from './Rover';

export default class Grid extends Component {
    static propTypes = {
        rows: PropTypes.number,
        columns: PropTypes.number,
        obstacles: PropTypes.arrayOf(PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })),
        onAddObstacle: PropTypes.func,
        onRemoveObstacle: PropTypes.func,
        rover: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
            direction: PropTypes.string
        })
    };

    isRover = (row, column) => {
        return row === this.props.rover.y && column === this.props.rover.x;
    };

    renderCell = (row, column) => {
        return this.isRover(row, column) ? <Rover {...this.props.rover}/> : <span>&nbsp;</span>;
    };

    isObstacle = (row, column) => {
        return isObstacle({x: column, y: row}, this.props.obstacles);
    };

    getCellStyle = (row, column) => {
        return this.isObstacle(row, column) ? 'obstacle' : '';
    };

    toggleCell = (row, column) => {
        if (!this.isRover(row, column)) {
            if (this.isObstacle(row, column)) {
                this.props.onRemoveObstacle(row, column);
            } else {
                this.props.onAddObstacle(row, column);
            }
        }
    };

    renderColumns = (row) => {
        return Array.from(Array(this.props.columns).keys())
            .map((col) => <td onClick={(e) => this.toggleCell(row, col)} className={this.getCellStyle(row, col)} key={row + '.' + col}>{this.renderCell(row, col)}</td>);
    };

    renderRows = () => {
        return Array.from(Array(this.props.rows).keys())
            .map((row) => <tr key={row}>{this.renderColumns(this.props.rows - row - 1)}</tr>);
    };

    render() {
        return <table className="rover-grid"><tbody>{this.renderRows()}</tbody></table>;
    }
}