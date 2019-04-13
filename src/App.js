import React, { Component } from 'react';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider, connect} from 'react-redux';

import {addObstacle, removeObstacle, rotateRight, rotateLeft, moveForward, moveBackward, setGrid, runScript} from './actions/rover';

import rover from './reducers/rover';
import Grid from './components/Grid';
import Help from './components/Help';
import Buttons from './components/Buttons';
import ControlCenter from './components/ControlCenter';

const RoverGrid = connect((state) => ({
  ...state.grid,
  rover: {
    x: state.position.x,
    y: state.position.y,
    direction: state.direction
  }
}), {
  onAddObstacle: addObstacle,
  onRemoveObstacle: removeObstacle
})(Grid);

const NavigationButtons = connect((state) => ({
  rows: state.grid.rows,
  columns: state.grid.columns
}), {
  onRotateRight: rotateRight,
  onRotateLeft: rotateLeft,
  onMoveForward: moveForward,
  onMoveBackward: moveBackward,
  onCreateGrid: setGrid
})(Buttons);

const InputOutput = connect((state) => ({
  output: state.output,
  input: "Grid\nSize 5 4\nObstacle 2 0\nObstacle 0 3\nObstacle 3 2\nCommands\nRFF\nRF\nLFRFFLFFFLL",
  errors: state.errors
}), {
  onRun: runScript
})(ControlCenter);

const store = createStore(rover,
  applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <>
        <div className="left-panel">
          <NavigationButtons/>
          <Help/>
        </div>
        <RoverGrid/>
        <InputOutput/>
        </>
      </Provider>
    );
  }
}

export default App;
