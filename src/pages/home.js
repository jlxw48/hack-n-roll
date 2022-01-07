import React from 'react';
import "./home.css";
import animation from '../images/homeAnimation.gif'
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

export default function Home() {

    const description = "Having trouble figuring how to split costs with your friends? Try this!"
    return (
        <div>
            <h1 id='mainTitle'>Welcome to Split Da Bill</h1>
            <img src={animation} alt='loading...' id='mainAnimation'/>
            <p id='mainDescription'>{description}</p>
            <div id='mainSignUpButtonContainer'>
                <Button variant='outlined' size='large' id='mainSignUpButton' endIcon={<DoubleArrowIcon />}>Sign Up</Button>
            </div>
        </div>
    )
}
