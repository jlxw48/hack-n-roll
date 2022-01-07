import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, TextField, Button, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { forEachOf, mapValues } from 'async';

export default function FormModal(props) {
    const {isOpen, handleClose} = props
    const [persons, setPersons] = useState([
        {person: ''}
    ])

    const addField = () => {
        setPersons([...persons, {person: ''}])
    }

    const removeField = (index) => {
        let fields = [...persons]

        if (fields.length === 1) {
            alert("You must split with at least one other person!")
        } else {
            fields.splice(index, 1)
            setPersons(fields)
        }
    }

    const handleOnChangeField = (index, event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        const fields = [...persons]
        fields[index]['person'] = event.target.value;
        setPersons(fields)
        console.log(fields)
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth='sm'>
                <DialogTitle sx={{paddingBottom:0}}>New Event</DialogTitle>
                <DialogContent>
                    <TextField 
                        variant='standard' 
                        autoFocus 
                        margin='dense'
                        fullWidth
                        label="Event Name"/>
                </DialogContent>
                <DialogTitle sx={{paddingBottom:0}}>Who to split?</DialogTitle>
                <DialogContent>
                        <TextField 
                            variant='standard' 
                            autoFocus 
                            margin='dense'
                            fullWidth
                            label="Your Name"
                            sx={{width:"50%"}}/>
                        {persons.map( (personObj, index) => (
                            <div key={index}>
                                <TextField 
                                    variant='standard' 
                                    autoFocus 
                                    margin='dense'
                                    label={"Person " + (index+2)}
                                    sx={{width:"50%"}}
                                    value={personObj.person}
                                    onChange={event => handleOnChangeField(index, event)}/>
                                <IconButton onClick={() => removeField(index)} size='large' sx={{marginTop: '10px'}}>
                                    <RemoveIcon />
                                </IconButton>
                                <IconButton onClick={addField} size='large' sx={{marginTop: '10px'}}>
                                    <AddIcon />
                                </IconButton>   
                            </div>
                            
                            
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button>Calculate</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
