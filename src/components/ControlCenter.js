import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ControlCenter extends Component {
    static propTypes = {
        output: PropTypes.array,
        onRun: PropTypes.func,
        input: PropTypes.string,
        errors: PropTypes.arrayOf(PropTypes.string)
    };

    run = () => {
        this.props.onRun(this.input.value);
    };

    renderErrors = () => {
        if (this.props.errors.length > 0) {
            return this.props.errors.map(error => <div className="script-error">{error}</div>)
        }
        return null;
    };

    render() {
        return (<div className="control-center">
        <h3>Enter your commands script</h3>
        Use the input area to enter a commands script, use the Run button to run it and see the related output in the output area.
        <div><label>Input:</label><textarea rows={10} ref={(el) => this.input = el} defaultValue={this.props.input}></textarea>
        <label>Output:</label><textarea readOnly={true} rows={10} value={this.props.output.join('\n')}></textarea></div>
        <button onClick={this.run}>Run</button>
        {this.renderErrors()}
        </div>);
    }
}