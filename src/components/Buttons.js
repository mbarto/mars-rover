import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Buttons extends Component {
    static propTypes = {
        rows: PropTypes.number,
        columns: PropTypes.number,
        onRotateRight: PropTypes.func,
        onRotateLeft: PropTypes.func,
        onMoveForward: PropTypes.func,
        onMoveBackward: PropTypes.func,
        onCreateGrid: PropTypes.func
    };

    createGrid = () => {
        const columns = parseInt(this.columns.value, 10);
        const rows = parseInt(this.rows.value, 10);
        if (columns && rows) {
            this.props.onCreateGrid(rows, columns);
        }
    };

    render() {
        return (
            <div className="buttons">
                <h3>Create a new grid:</h3>
                <div><label>Rows:</label><input ref={(el) => this.rows = el} defaultValue={this.props.rows}/></div>
                <div><label>Cols:</label><input ref={(el) => this.columns = el} defaultValue={this.props.columns}/>&nbsp;<button onClick={this.createGrid}>Create</button></div>
                <h3>Move / rotate the rover:</h3>
                <button onClick={this.props.onRotateRight}>Right</button>
                <button onClick={this.props.onRotateLeft}>Left</button>
                <button onClick={this.props.onMoveForward}>Forward</button>
                <button onClick={this.props.onMoveBackward}>Backward</button>
            </div>
        );
    }
}