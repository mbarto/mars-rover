import {isObstacle} from '../utils/rover';
import {ADD_OBSTACLE, REMOVE_OBSTACLE, ROTATE_RIGHT, ROTATE_LEFT, MOVE_FORWARD, MOVE_BACKWARD, SET_GRID,
    RESET_OUTPUT, WRITE_OUTPUT, SCRIPT_ERROR} from '../actions/rover';

const initialState = {
    position: {
        x: 0,
        y: 0
    },
    direction: 'N',
    grid: {
        columns: 5,
        rows: 4,
        obstacles: []
    },
    output: [],
    errors: []
};

const isValidObstacle = (x, y, grid) => {
    return x < grid.columns && x >= 0 && y < grid.rows && y >= 0;
};

const directions = ['N', 'E', 'S', 'W'];

const rotateRover = (currentDirection, clockWise) => {
    const newDirection = directions.indexOf(currentDirection) + clockWise;
    return directions[newDirection < 0 ? 3 : newDirection % 4];
};

const offsets = {
    'N': {
        x: 0,
        y: 1
    },
    'S': {
        x: 0,
        y: -1
    },
    'E': {
        x: 1,
        y: 0
    },
    'W': {
        x: -1,
        y: 0
    }
}

const restrictTo = (pos, min, max) => {
    if (pos >= min && pos <= max) {
        return pos;
    }
    if (pos < min) {
        return max;
    }
    if (pos > max) {
        return min;
    }
}

const moveRover = (currentPosition, currentDirection, forward, grid) => {
    const newPosition = {
        x: restrictTo(currentPosition.x + offsets[currentDirection].x * forward, 0, grid.columns - 1),
        y: restrictTo(currentPosition.y + offsets[currentDirection].y * forward, 0, grid.rows - 1)
    };
    return isObstacle(newPosition, grid.obstacles) ? Object.assign(currentPosition, {
        blocked: true
    }) : newPosition;
};

const rover = (state = initialState, action) => {
    switch(action.type) {
        case SET_GRID: {
            return {
                ...initialState,
                grid: {
                    columns: action.columns,
                    rows: action.rows,
                    obstacles: []
                }
            }
        }
        case ADD_OBSTACLE: {
            if (state.grid && isValidObstacle(action.x, action.y, state.grid)) {
                const obstacles = [...(state.grid.obstacles || []), {
                    x: action.x,
                    y: action.y
                }];
                return {
                    ...state,
                    grid: {
                        ...state.grid,
                        obstacles
                    }
                }
            }
            return state;
        }
        case REMOVE_OBSTACLE: {
            if (state.grid && isValidObstacle(action.x, action.y, state.grid)) {
                const obstacles = (state.grid.obstacles || []).filter(o => o.x !== action.x || o.y !== action.y);
                return {
                    ...state,
                    grid: {
                        ...state.grid,
                        obstacles
                    }
                }
            }
            return state;
        }
        case ROTATE_RIGHT: {
            return {
                ...state,
                direction: rotateRover(state.direction, 1)
            };
        }
        case ROTATE_LEFT: {
            return {
                ...state,
                direction: rotateRover(state.direction, -1)
            };
        }
        case MOVE_FORWARD: {
            return {
                ...state,
                position: moveRover(state.position, state.direction, 1, state.grid)
            };
        }
        case MOVE_BACKWARD: {
            return {
                ...state,
                position: moveRover(state.position, state.direction, -1, state.grid)
            };
        }
        case RESET_OUTPUT: {
            return {
                ...state,
                output: [],
                errors: []
            };
        }
        case WRITE_OUTPUT: {
            return {
                ...state,
                output: [...state.output, action.output]
            };
        }
        case SCRIPT_ERROR: {
            return {
                ...state,
                errors: [...state.errors, action.error]
            };
        }
        default:
            return state;
    }
};

export default rover;