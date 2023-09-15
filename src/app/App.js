import React, { useState, Component } from 'react';

import TasksApp from '../components/TasksApp'
import baseTheme from './theme/baseTheme';
import { lightTheme, darkTheme, darkBlueTheme } from './theme';
import {
  ThemeProvider, Typography, createTheme, Paper, Button, Container
} from '@mui/material';
import { deepmerge } from '@mui/utils'

const App = (props) => {
  const [theme, setTheme] = useState(baseTheme)
  const handleSwitch = (whichTheme) => {
    const newTheme = deepmerge(baseTheme, whichTheme)
    setTheme(createTheme(newTheme))
  }
  console.log(props)
  return (<ThemeProvider theme={theme}>
    <Container>
      <Paper sx={{ height: "100%", padding: "20px" }} className="App">
        <Typography color="primary" variant="h4">
          Material UI Themes
        </Typography>
        <Button onClick={() => setTheme(baseTheme)} variant="contained" color="primary">
          Default
        </Button>
        <Button
          onClick={() => handleSwitch(JSON.parse(lightTheme))}
          variant="contained"
          color="secondary"
          style={{
            display: 'none'
          }}
        >
          Light & Green
        </Button>
        <Button
          onClick={() => handleSwitch(darkTheme)}
          variant="contained"
          style={{
            display: 'none'
          }}
        >
          Dark Gray
        </Button>
        <Button
          onClick={() => handleSwitch(darkBlueTheme)}
          variant="contained"
        >
          Dark
        </Button>

      <TasksApp />
      </Paper>
      </Container>
  </ThemeProvider>);
}

export default App;
