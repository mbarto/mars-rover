export const isObstacle = (position, obstacles) => obstacles.filter(o => o.x === position.x && o.y === position.y).length > 0;

const MODE_START = 'START';
const MODE_GRID = 'GRID';
const MODE_COMMANDS = 'COMMANDS';

const navigationActions = {
    'R': 'ROTATE_RIGHT',
    'L': 'ROTATE_LEFT',
    'F': 'MOVE_FORWARD',
    'B': 'MOVE_BACKWARD'
}

export const parseScript = (script) => {
    let mode = MODE_START;
    const lines = script.split("\n");
    const compiled = lines.reduce((previous, line) => {
        switch(mode) {
            case MODE_START: {
                switch(line.toLowerCase()) {
                    case 'grid': {
                        mode = MODE_GRID;
                        break;
                    }
                    default:
                        return [...previous, {
                            type: 'SCRIPT_ERROR',
                            error: 'Expected Grid as first command'
                        }]; 
                }
                break;
            }
            case MODE_GRID: {
                const command = line.split(' ');
                switch(command[0].toLowerCase()) {
                    case 'size': {
                        if (command.length >=3) {
                            return [...previous, {
                                type: 'SET_GRID',
                                columns: parseInt(command[1], 10),
                                rows: parseInt(command[2], 10)
                            }];
                        }
                        break;
                    }
                    case 'obstacle': {
                        if (command.length >=3) {
                            return [...previous, {
                                type: 'ADD_OBSTACLE',
                                x: parseInt(command[1], 10),
                                y: parseInt(command[2], 10)
                            }];
                        }
                        break;
                    }
                    case 'commands': {
                        mode = MODE_COMMANDS;
                        break;
                    }
                    default:
                    return [...previous, {
                        type: 'SCRIPT_ERROR',
                        error: 'Expected one of Size, Obstacle or Commands'
                    }];
                }
                break;
            }
            case MODE_COMMANDS: {
                const commands = line.split('');
                const actions = commands.map(c => ({
                    type: navigationActions[c] || 'ERROR'
                }));
                if (actions.filter(a => a.type === 'ERROR').length > 0) {
                    return [...previous, {
                        type: 'SCRIPT_ERROR',
                        error: 'Unknown navigation commands in ' + line
                    }];
                }
                return [...previous, ...actions, {
                    type: 'WRITE_ROVER_STATUS'
                }];
            }
            default:
        }
        return previous;
    }, []);
    return compiled;
}

export const getRoverStatus = (state) => {
    return (state.position.blocked ? 'O:' : '') + (state.position.x + ':' + state.position.y + ':' + state.direction);
};