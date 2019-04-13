import {runScript} from './rover';

const sampleScript = "Grid\nSize 5 4\nObstacle 2 0\nObstacle 0 3\nObstacle 3 2\nCommands\nRFF\nRF";
const sampleScriptWithErrors = "Grid\nSize 5 4\nObstacle 2 0\nObstacle 0 3\nObstacle 3 2\nCommands\nRFFABC";

it('runScript action runs a script and produces a set of actions', () => {
    let actions = [];
    const dispatch = (action) => {
        actions.push(action);
    };
    const getState = () => ({
        position: {
            x: 0,
            y: 0,
            blocked: false
        },
        direction: 'N'
    })
    runScript(sampleScript, 0)(dispatch, getState);
    expect(actions.length).toBe(12);
    expect(actions[0].type).toBe('RESET_OUTPUT');
    expect(actions[1].type).toBe('SET_GRID');
    expect(actions[2].type).toBe('ADD_OBSTACLE');
    expect(actions[3].type).toBe('ADD_OBSTACLE');
    expect(actions[4].type).toBe('ADD_OBSTACLE');
    expect(actions[5].type).toBe('ROTATE_RIGHT');
    expect(actions[6].type).toBe('MOVE_FORWARD');
    expect(actions[7].type).toBe('MOVE_FORWARD');
    expect(actions[8].type).toBe('WRITE_OUTPUT');
    expect(actions[9].type).toBe('ROTATE_RIGHT');
    expect(actions[10].type).toBe('MOVE_FORWARD');
    expect(actions[11].type).toBe('WRITE_OUTPUT');
});

it('runScript action triggers error action if script is not correct', () => {
    let actions = [];
    const dispatch = (action) => {
        actions.push(action);
    };
    const getState = () => ({
        position: {
            x: 0,
            y: 0,
            blocked: false
        },
        direction: 'N'
    })
    runScript(sampleScriptWithErrors, 0)(dispatch, getState);
    expect(actions.length).toBe(6);
    expect(actions[5].type).toBe('SCRIPT_ERROR');
});