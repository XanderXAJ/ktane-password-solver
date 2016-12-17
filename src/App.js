import React, { Component } from 'react';
import './App.css';

const PASSWORD_LENGTH = 5;
const PASSWORDS = ["about", "after", "again", "below", "could", "every", "first", "found", "great", "house", "large", "learn", "never", "other", "place", "plant", "point", "right", "small", "sound", "spell", "still", "study", "their", "there", "these", "thing", "think", "three", "water", "where", "which", "world", "would", "write"];

class PasswordColumnInput extends Component {
  handleChange = (event) => {
    this.props.onChange && this.props.onChange(this.props.index, event.target.value);
  }

  focus = () => {
    this.input && this.input.focus();
  }

  render() {
    return (
      <div>
        <label>
          {this.props.name}:&nbsp;
          <input
            ref={ (input) => { this.input = input; } }
            type="text"
            value={this.props.value}
            onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}



class PasswordColumnsInput extends Component {
  constructor(props) {
    super(props);
    this.columnComponents = [];
  }

  componentDidMount() {
    // Automatically put focus on the first input
    if (this.columnComponents.length > 0) {
      this.columnComponents[0] && this.columnComponents[0].focus();
    }
  }

  handleColumnChange = (index, value) => {
    let columns = this.props.columns;
    columns[index] = value;
    this.props.onChange(columns);
  }

  render() {
    const columns = this.props.columns;
    let inputs = [];

    for (let i = 0; i < columns.length; i++) {
      inputs.push(
        <PasswordColumnInput
          index={i}
          key={i}
          name={'Column ' + (i + 1)}
          ref={ (component) => { this.columnComponents[i] = component; } }
          onChange={this.handleColumnChange}
          value={columns[i]} />
      );
    }

    return (
      <fieldset>
        {inputs}
      </fieldset>
    );
  }
}



function getPasswordColumnsRegexp(columns) {
  // Make empty columns match any character, filled-in columns match entered characters
  const columnMatchers = columns.map( (column) => column.length > 0 ? '[' + column + ']' : '.' );
  return new RegExp('^' + columnMatchers.join('') + '$');
}

function filterValidPasswords(columns, passwords) {
  const regexp = getPasswordColumnsRegexp(columns);
  return PASSWORDS.filter( (password) => regexp.test(password) );
}

class ValidPasswordList extends Component {
  render() {
    let validPasswords = filterValidPasswords(this.props.columns, PASSWORDS);

    return (
      <ul>
        {validPasswords.map(
          (password) =>
            <li key={password}>{password}</li>
        )}
      </ul>
    );
  }
}



class PasswordSolver extends Component {
  constructor(props) {
    super(props);

    let columns = [];
    for (let i = 0; i < PASSWORD_LENGTH; i++) {
      columns.push('');
    }
    this.state = {columns};
  }

  handleChange = (columns) => {
    this.setState({columns});
  }

  render() {
    return (
      <div>
        <PasswordColumnsInput
          onChange={this.handleChange}
          columns={this.state.columns} />
        <ValidPasswordList
          columns={this.state.columns} />
      </div>
    );
  }
}



class App extends Component {
  render() {
    return (
      <div className="App">
        <PasswordSolver />
      </div>
    );
  }
}

export default App;
