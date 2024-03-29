export const lightTheme = `{
    "palette": {
        "background": {
            "default": "#e4f0e2"
          },
        "primary": {
            "main": "#357a38"
        },
        "secondary": {
            "main": "#393e46"
        }
    },
    "components": {
        "MuiButton": {
            "defaultProps": {
                "disableRipple": true,
                "size": "small",
                "sx": {
                    "color": "#393e46"
                }
            }
        },
        "MuiPaper": {
            "defaultProps": {
                "elevation": 10
            },
            "styleOverrides": {
                "root": {
                    "background": "#f6f6f6"
                }
            }
        }
    }
}`

// "background": "#222831"

export const darkTheme = {
    palette: {
        background: {
            default: "#222222"
          },
        primary: {
            main: '#1769aa'
        },
        secondary: {
            main: '#00b0ff'
        }
    },
    components: {
        MuiButton: {
            disableRipple: true,
            size: 'large',
            sx: {
                borderRadius: '10px'
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: 'gray'
                }
            },
            defaultProps: {
                elevation: 20
            }
        }
    }
}

export const darkBlueTheme = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#5893df'
        },
        secondary: {
            main: '#2ec5d3'
        },
        text: {
            primary: 'rgba(255, 255, 255, 0.84)'
        }
    }
}
