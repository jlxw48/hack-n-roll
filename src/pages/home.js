import React, { useState } from 'react';
import "./home.css";
import animation from '../images/homeAnimation.gif'
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import FormModal from '../components/formModal';

export default function Home() {

    const description = "Have trouble figuring how to split costs with your friends?"
    
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => {
        setIsOpen(false)
    }

    const startForm = () => {
        setIsOpen(true)
    }

    return (
        <div>
            <h1 id='mainTitle'>Welcome to Split Da Bill</h1>
            <img src={animation} alt='loading...' id='mainAnimation'/>
            <p id='mainDescription'>{description}</p>
            <div id='mainSignUpButtonContainer'>
                <Button onClick={startForm} variant='outlined' size='large' id='mainSignUpButton' endIcon={<DoubleArrowIcon />}>Try Now!</Button>
            </div>
            <FormModal isOpen={isOpen} handleClose={handleClose}/>
        </div>
    )
}
