#!/usr/bin/env node
'use strict';
const meow = require('meow');
const moment = require('moment');
const React = require('react');
const {render, Color} = require('ink');
const shell = require('shelljs');

const cli = meow(
  `
	Usage
	  $ last-chance-to-commit

	Options
    --frequency, -f Set a frequency to run git reset in minutes. Default is 60mins.

	Examples
	  $ last-chance-to-commit -f 120
`,{
	flags: {
		frequency: {
			type: 'string',
      alias: 'f',
      default: "60",
    }
    }
}
);

const runGitRevert = () => {
  if (shell.exec('git reset --hard').code !== 0) {
    shell.echo('Error: Git Reset failed');
    shell.exit(1);
  }
};

class UI extends React.Component {
  initialState() {
    const frequency = moment.duration(parseInt(this.props.frequency), 'minutes');
    const now = new Date();
    return {
      startTime: now,
      frequency: frequency,
    };
  }

  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  componentDidMount() {
    setInterval(() => {
      const {frequency} = this.state;
      if (frequency.asSeconds() <= 0) {
        runGitRevert();
        this.setState(this.initialState());
      } else {
        this.setState({
          frequency: moment.duration(frequency.asSeconds() - 1, 'seconds'),
        });
      }
    }, 1000);
  }

  render() {
    const {frequency} = this.state;
    if (frequency.asSeconds() <= 60) {
      return (
        <Color red>
          Only {Math.round(frequency.asSeconds() * 100) / 100} seconds left! Last
          chance to commit!
        </Color>
      );
    }

    if (frequency.asMinutes() <= 5) {
      return (
        <Color yellow>
          You have only {Math.round(frequency.asMinutes() * 100) / 100} minutes left!
        </Color>
      );
    }

    return (
      <Color green>
        You have {Math.round(frequency.asMinutes() * 100) / 100} minutes left
        until the next reset
      </Color>
    );
  }
}

render(<UI frequency={cli.flags.frequency} />);

