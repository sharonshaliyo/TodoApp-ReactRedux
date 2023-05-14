import React, { Component } from 'react';

import TasksApp from '../components/TasksApp'

class App extends Component {
  render() {
    console.log(this.props)
    return (<TasksApp />);
  }
}

export default App;
