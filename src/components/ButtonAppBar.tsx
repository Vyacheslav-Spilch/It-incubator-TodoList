import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../state/store'
import { logOutTC } from './Login/auth-reducer'

export const ButtonAppBar = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.authReducer.isLoggedIn)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolists
                    </Typography>
                    {isLoggedIn && (
                        <Button onClick={() => dispatch(logOutTC())} color="inherit">
                            Login out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
