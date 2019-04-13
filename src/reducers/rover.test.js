import rover from './rover';

const sampleGrid = {
    columns: 5,
    rows: 4,
    obstacles: []
};

const sampleGridWithObstacles = {
    columns: 5,
    rows: 4,
    obstacles: [{
        x: 2,
        y: 3
    }]
};

const initialRover = {
    grid: sampleGrid,
    position: {
        x: 2,
        y: 2
    },
    direction: 'N',
    output: []
};

const createRover = (x, y, direction) => ({grid: sampleGrid, position: {x, y}, direction});

it('creates a grid for the rover when SET_GRID action is triggered', () => {
    const newState = rover({}, {
        type: 'SET_GRID',
        rows: 4,
        columns: 5
    });
    expect(newState.grid).toBeDefined();
    expect(newState.grid.columns).toBe(5);
    expect(newState.grid.rows).toBe(4);
    expect(newState.grid.obstacles).toBeDefined();
    expect(newState.grid.obstacles.length).toBe(0);
});

it('adds an obstacle to the grid when the ADD_OBSTACLE action is triggered', () => {
    const newState = rover({
        grid: sampleGrid
    }, {
        type: 'ADD_OBSTACLE',
        x: 2,
        y: 0
    });
    expect(newState.grid.obstacles.length).toBe(1);
});

it('removes an obstaclefromto the grid when the REMOVE_OBSTACLE action is triggered', () => {
    const newState = rover({
        grid: sampleGridWithObstacles
    }, {
        type: 'REMOVE_OBSTACLE',
        x: 2,
        y: 3
    });
    expect(newState.grid.obstacles.length).toBe(0);
});

it('cannot add obstacle if the grid is not set yet', () => {
    const newState = rover({}, {
        type: 'ADD_OBSTACLE',
        x: 2,
        y: 0
    });
    expect(newState.grid).not.toBeDefined();
});

it('cannot add obstacle if x is out of range', () => {
    const newState = rover({
        grid: sampleGrid
    }, {
        type: 'ADD_OBSTACLE',
        x: 6,
        y: 0
    });
    expect(newState.grid.obstacles.length).toBe(0);
});

it('cannot add obstacle if x is negative', () => {
    const newState = rover({
        grid: sampleGrid
    }, {
        type: 'ADD_OBSTACLE',
        x: -2,
        y: 0
    });
    expect(newState.grid.obstacles.length).toBe(0);
});

it('cannot add obstacle if y is out of range', () => {
    const newState = rover({
        grid: sampleGrid
    }, {
        type: 'ADD_OBSTACLE',
        x: 0,
        y: 10
    });
    expect(newState.grid.obstacles.length).toBe(0);
});

it('cannot add obstacle if y is negative', () => {
    const newState = rover({
        grid: sampleGrid
    }, {
        type: 'ADD_OBSTACLE',
        x: 0,
        y: -3
    });
    expect(newState.grid.obstacles.length).toBe(0);
});

it('initial state of the rover is 0,0,N', () => {
    const newState = rover(undefined, {});
    expect(newState.position.x).toBe(0);
    expect(newState.position.y).toBe(0);
    expect(newState.direction).toBe('N');
});

it('rotates 90 degrees clockwise if ROTATE_RIGHT action is triggered', () => {
    let newState = rover(initialRover, {
        type: 'ROTATE_RIGHT'
    });
    expect(newState.direction).toBe('E');

    newState = rover(newState, {
        type: 'ROTATE_RIGHT'
    });
    expect(newState.direction).toBe('S');
    
    newState = rover(newState, {
        type: 'ROTATE_RIGHT'
    });
    expect(newState.direction).toBe('W');

    newState = rover(newState, {
        type: 'ROTATE_RIGHT'
    });
    expect(newState.direction).toBe('N');
});

it('rotates 90 degrees counter-clockwise if ROTATE_LEFT action is triggered', () => {
    let newState = rover(initialRover, {
        type: 'ROTATE_LEFT'
    });
    expect(newState.direction).toBe('W');

    newState = rover(newState, {
        type: 'ROTATE_LEFT'
    });
    expect(newState.direction).toBe('S');
    
    newState = rover(newState, {
        type: 'ROTATE_LEFT'
    });
    expect(newState.direction).toBe('E');

    newState = rover(newState, {
        type: 'ROTATE_LEFT'
    });
    expect(newState.direction).toBe('N');
});

it('moves north if current direction is north and MOVE_FORWARD action is triggered', () => {
    const newState = rover(initialRover, {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(3);
});

it('moves south if current direction is south and MOVE_FORWARD action is triggered', () => {
    const newState = rover({
        ...initialRover,
        direction: 'S'
    }, {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(1);
});

it('moves east if current direction is east and MOVE_FORWARD action is triggered', () => {
    const newState = rover({
        ...initialRover,
        direction: 'E'
    }, {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(3);
    expect(newState.position.y).toBe(2);
});

it('moves west if current direction is east and MOVE_FORWARD action is triggered', () => {
    const newState = rover({
        ...initialRover,
        direction: 'W'
    }, {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(1);
    expect(newState.position.y).toBe(2);
});

it('moves south if current direction is north and MOVE_BACKWARD action is triggered', () => {
    const newState = rover(initialRover, {
        type: 'MOVE_BACKWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(1);
});

it('moves north if current direction is south and MOVE_BACKWARD action is triggered', () => {
    const newState = rover({
        ...initialRover,
        direction: 'S'
    }, {
        type: 'MOVE_BACKWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(3);
});

it('moves west if current direction is east and MOVE_BACKWARD action is triggered', () => {
    const newState = rover({
        ...initialRover,
        direction: 'E'
    }, {
        type: 'MOVE_BACKWARD'
    });
    expect(newState.position.x).toBe(1);
    expect(newState.position.y).toBe(2);
});

it('moves east if current direction is east and MOVE_BACKWARD action is triggered', () => {
    const newState = rover({
        ...initialRover,
        direction: 'W'
    }, {
        type: 'MOVE_BACKWARD'
    });
    expect(newState.position.x).toBe(3);
    expect(newState.position.y).toBe(2);
});

it('pacman behaviour if MOVE_FORWARD action is triggered and no cell is available in the current direction', () => {
    let newState = rover(createRover(2, 3, 'N'), {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(0);

    newState = rover(createRover(2, 0, 'S'), {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(3);

    newState = rover(createRover(4, 2, 'E'), {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(0);
    expect(newState.position.y).toBe(2);

    newState = rover(createRover(0, 2, 'W'), {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(4);
    expect(newState.position.y).toBe(2);
});

it('pacman behaviour if MOVE_BACKWARD action is triggered and no cell is available in the opposite direction', () => {
    let newState = rover(createRover(2, 0, 'N'), {
        type: 'MOVE_BACKWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(3);

    newState = rover(createRover(2, 3, 'S'), {
        type: 'MOVE_BACKWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(0);

    newState = rover(createRover(0, 2, 'E'), {
        type: 'MOVE_BACKWARD'
    });
    expect(newState.position.x).toBe(4);
    expect(newState.position.y).toBe(2);

    newState = rover(createRover(4, 2, 'W'), {
        type: 'MOVE_BACKWARD'
    });
    expect(newState.position.x).toBe(0);
    expect(newState.position.y).toBe(2);
});

it('cannot move over an obstacle', () => {
    const newState = rover({
        ...initialRover,
        grid: sampleGridWithObstacles
    }, {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(2);
    expect(newState.position.blocked).toBe(true);
});

it('if can move (no obstacle) blocked flag is falsy', () => {
    const newState = rover({
        ...initialRover,
        grid: sampleGrid
    }, {
        type: 'MOVE_FORWARD'
    });
    expect(newState.position.x).toBe(2);
    expect(newState.position.y).toBe(3);
    expect(newState.position.blocked).toBeFalsy();
});

it('output is reset when RESET_OUTPUT action is triggered', () => {
    const newState = rover({
        ...initialRover,
        output: ['my output']
    }, {
        type: 'RESET_OUTPUT'
    });
    expect(newState.output.length).toBe(0);
});

it('output is appended when WRITE_OUTPUT action is triggered', () => {
    const newState = rover({
        ...initialRover
    }, {
        type: 'WRITE_OUTPUT',
        output: 'my new output'
    });
    expect(newState.output.length).toBe(1);
});