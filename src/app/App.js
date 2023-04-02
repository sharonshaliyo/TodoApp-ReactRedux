// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksPage from '../components/TasksPage';

import { filterTasks } from '../actions/index'

import { getFilteredTasks } from '../reducers'

const mockTasks = [
{
    id: 1,
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'In Progress',
  },
];

class App extends Component {

  onSearch = searchTerm => {
    this.props.dispatch(filterTasks(searchTerm))
  }

  render() {
    console.log(this.props)
    return (
      <div className="main-content">
        <TasksPage
          tasks={this.props.tasks}
          onSearch={this.onSearch}
          // onCreateTask={this.onCreateTask}
          isLoading={this.props.isLoading}
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, error, searchTerm } = state

  console.log(state)
  return {
    tasks: getFilteredTasks(state), isLoading, error
  }
}

export default connect(mapStateToProps)(App);


