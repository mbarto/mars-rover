import {parseScript, getRoverStatus} from '../utils/rover';

export const ADD_OBSTACLE = 'ADD_OBSTACLE';
export const REMOVE_OBSTACLE = 'REMOVE_OBSTACLE';
export const ROTATE_RIGHT = 'ROTATE_RIGHT';
export const ROTATE_LEFT = 'ROTATE_LEFT';
export const MOVE_FORWARD = 'MOVE_FORWARD';
export const MOVE_BACKWARD = 'MOVE_BACKWARD';
export const SET_GRID = 'SET_GRID';
export const RESET_OUTPUT = 'RESET_OUTPUT';
export const WRITE_OUTPUT = 'WRITE_OUTPUT';
export const WRITE_ROVER_STATUS = 'WRITE_ROVER_STATUS';
export const SCRIPT_ERROR = 'SCRIPT_ERROR';

export const addObstacle = (row, column) => {
    return {
        type: ADD_OBSTACLE,
        x: column,
        y: row
    }
};

export const removeObstacle = (row, column) => {
    return {
        type: REMOVE_OBSTACLE,
        x: column,
        y: row
    }
};

export const rotateRight = () => {
    return {
        type: ROTATE_RIGHT
    };
};

export const rotateLeft = () => {
    return {
        type: ROTATE_LEFT
    };
};

export const moveForward = () => {
    return {
        type: MOVE_FORWARD
    };
};

export const moveBackward = () => {
    return {
        type: MOVE_BACKWARD
    };
};

export const setGrid = (rows, columns) => {
    return {
        type: SET_GRID,
        rows,
        columns
    };
};

export const resetOutput = () => {
    return {
        type: RESET_OUTPUT
    }
};

export const writeOutput = (output) => {
    return {
        type: WRITE_OUTPUT,
        output
    }
};

const runAction = (actions, dispatch, getState, delay) => {
    const action = actions.shift();
    if (action.type === WRITE_ROVER_STATUS) {
        dispatch(writeOutput(getRoverStatus(getState())));
    } else {
        dispatch(action);
    }
    runFirstAction(actions, dispatch, getState, delay);
}

const runFirstAction = (actions, dispatch, getState, delay) => {
    if (actions.length > 0) {
        if (delay > 0) {
            setTimeout(() => {
                runAction(actions, dispatch, getState, delay);
            }, delay);
        } else {
            runAction(actions, dispatch, getState, delay);
        }
    }
};

export const runScript = (script, delay = 1000) => {
    return (dispatch, getState) => {
        dispatch(resetOutput());
        const actions = parseScript(script);
        runFirstAction(actions, dispatch, getState, delay);
    };
}