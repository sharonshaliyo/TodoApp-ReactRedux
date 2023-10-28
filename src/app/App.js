import React, { useState } from 'react';

import TasksApp from '../components/TasksApp'
import baseTheme from './theme/baseTheme';
import { lightTheme, darkTheme, darkBlueTheme } from './theme';
import {
  ThemeProvider, createTheme, Paper, Button, Container, Switch
} from '@mui/material';
// import { deepmerge } from '@mui/utils'

const themeMap = {
  light: lightTheme,
  dark: darkBlueTheme
}

const App = (props) => {
  const [theme, setTheme] = useState(baseTheme)
  const handleSwitch = (whichTheme) => {
    // const newTheme = deepmerge(baseTheme, whichTheme)
    setTheme(createTheme(whichTheme))
  }
  const [ themeId, setThemeId ] = useState('light')
  const switchTheme = () => {
    const newThemeId = themeId === 'light' ? 'dark' : 'light'
    setThemeId(newThemeId)
    setTheme(createTheme(themeMap[newThemeId]))
  }
  console.log(props)
  return (<ThemeProvider theme={theme}>
    <Container>
      <Paper sx={{ height: "100%", padding: "20px" }} className="App">
        Switch Theme
        <Button onClick={() => setTheme(baseTheme)} variant="contained" color="primary" style={{ display: 'none' }}>
          Default
        </Button>
        <Button
          onClick={() => handleSwitch(JSON.parse(lightTheme))}
          variant="contained"
          color="secondary"
          style={{ display: 'none' }}
        >
          Light & Green
        </Button>
        <Button
          onClick={() => handleSwitch(darkTheme)}
          variant="contained"
          style={{ display: 'none' }}
        >
          Dark Gray
        </Button>
        <Button
          onClick={() => handleSwitch(darkBlueTheme)}
          variant="contained"
          style={{ display: 'none' }}
        >
          Dark
        </Button>
        <Switch checked={ themeId === 'dark' } onChange={switchTheme} />

      <TasksApp />
      </Paper>
      </Container>
  </ThemeProvider>);
}

export default App;
