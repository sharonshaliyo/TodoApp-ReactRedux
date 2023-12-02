import React, { useState } from 'react';
import { lightTheme, darkTheme, darkBlueTheme } from './theme';
import {
    ThemeProvider, createTheme, Paper, Button, Container, Switch, Link, Box
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TasksApp from '../components/TasksApp'
import baseTheme from './theme/baseTheme';
// import { deepmerge } from '@mui/utils'

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
        <Container>
            <Paper sx={{ height: "100%", padding: "20px" }} className="App">
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
                <TasksApp />
            </Paper>
        </Container>
    </ThemeProvider>);
}

export default App;
