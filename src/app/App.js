import React, { Suspense, useState } from 'react'
import { lightTheme, darkTheme, darkBlueTheme } from './theme'
import {
  ThemeProvider, createTheme, Paper, Button, Container, Switch, Box, Link,
  CssBaseline, ScopedCssBaseline
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import SimpleTodo from '../components/SimpleTodo'
import baseTheme from './theme/baseTheme'

import VerticalDraggableContainer from '../components/SimpleTodo/VerticalDraggableContainer/DraggableContainer.jsx'
// const VerticalDraggableContainer = React.lazy(() => import('../components/SimpleTodo/VerticalDraggableContainer/DraggableContainer.jsx'))

const themeMap = {
  light: lightTheme,
  dark: darkBlueTheme
}

const App = (props) => {
  const [theme, setTheme] = useState(baseTheme)
  const handleSwitch = (whichTheme) => {
    setTheme(createTheme(whichTheme))
  }
  const [themeId, setThemeId] = useState('light')
  const switchTheme = () => {
    const newThemeId = themeId === 'light' ? 'dark' : 'light'
    setThemeId(newThemeId)
    setTheme(createTheme(themeMap[newThemeId]))
  }

  return (<ThemeProvider theme={theme}>
    <ScopedCssBaseline>
    <CssBaseline enableColorScheme >
    <Container>
      <Paper sx={{ height: '100%', padding: '20px' }} className="App">
        <Box sx={{ display: 'flex' }}>
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
          <Box sx={{ flexGrow: 1 }}>
            <Switch checked={themeId === 'dark'} onChange={switchTheme} />
          </Box>
          <Link
            href='https://github.com/sharonshaliyo/TodoApp-ReactRedux'
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon /> GitHub
          </Link>
        </Box>
        <SimpleTodo />
        {/* <BrowserRouter>
          <NavLink to="/">Home</NavLink>
          <NavLink style={{ marginLeft: 16 }} to="/vertical">Vertical Tasks</NavLink>
          <NavLink style={{ marginLeft: 16 }} to="/tasksapp">Tasks App</NavLink>
          <Routes >
            <Route exact path="/" element={<SimpleTodo />} ></Route>
            <Route exact path="/vertical" element={<Suspense fallback={<>Loading...</>}><VerticalDraggableContainer /></Suspense>} ></Route>
            <Route exact path="/vertical" element={<VerticalDraggableContainer />} ></Route>
          </Routes>
        </BrowserRouter> */}
      </Paper>
    </Container>

    </CssBaseline>
    </ScopedCssBaseline>
  </ThemeProvider>)
}

export default App
