import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function NavigationBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='transparent'>
                <Toolbar>
                    <Typography style={{color: "black"}} variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: {md: 'flex' } }}>
                        <Button style={{color: "black"}} href="/">Home</Button>
                        <Button style={{color: "black"}} href="/about">About</Button>
                        <Button style={{color: "black"}}>Sign up</Button>
                        <Button style={{color: "black"}}>Login</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
