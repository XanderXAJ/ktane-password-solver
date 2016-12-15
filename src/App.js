import React, { Component } from 'react';
import './App.css';

class PasswordColumnInput extends Component {
  handleChange = (event) => {
    this.props.onChange(this.props.column, event.target.value);
  }

  render() {
    return (
      <div>
        <label>
          Column {this.props.column}:&nbsp;
          <input
            type="text"
            maxLength="6"
            value={this.props.value}
            onChange={this.handleChange} />
        </label>
      </div>
    );
  }
}



class PasswordColumnsInput extends Component {
  handleColumnChange = (column, value) => {
    let columns = this.props.columns;
    columns[column - 1] = value;
    this.props.onChange(columns);
  }

  render() {
    return (
      <fieldset>
        <PasswordColumnInput
          column="1"
          onChange={this.handleColumnChange}
          value={this.props.columns[0]} />
        <PasswordColumnInput
          column="2"
          onChange={this.handleColumnChange}
          value={this.props.columns[1]} />
        <PasswordColumnInput
          column="3"
          onChange={this.handleColumnChange}
          value={this.props.columns[2]} />
        <PasswordColumnInput
          column="4"
          onChange={this.handleColumnChange}
          value={this.props.columns[3]} />
        <PasswordColumnInput
          column="5"
          onChange={this.handleColumnChange}
          value={this.props.columns[4]} />
      </fieldset>
    );
  }
}



const PASSWORDS = ["about", "after", "again", "below", "could", "every", "first", "found", "great", "house", "large", "learn", "never", "other", "place", "plant", "point", "right", "small", "sound", "spell", "still", "study", "their", "there", "these", "thing", "think", "three", "water", "where", "which", "world", "would", "write"];

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
  constructor(props) {
    super(props);
  }

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
    this.state = {columns: ['', '', '', '', '']};
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
