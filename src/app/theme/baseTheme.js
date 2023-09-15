import { createTheme } from "@mui/material"

const baseTheme = createTheme({
    palette: {
        primary: {
            main: "#af52bf"
        },
        secondary: {
            main: "#9500ae"
        }
    },
    shape: {
        borderRadius: 4
    },
    components: {
        MuiButton: {
            defaultProps: {
                sx: {
                    margin: 1
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    // background: "#393e46"
                    background: "#f0f0f0"
                }
            },
            defaultProps: {
                elevation: 0,
                sx: {
                    padding: 20
                }
            }
        },
        MuiContainer: {
            defaultProps: {
                sx: {
                    
                }
            }
        }
    }
})

export default baseTheme
