import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, TextField, Button, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function FormModal(props) {
    const {isOpen, handleClose} = props
    const [persons, setPersons] = useState([
        {person: '', amount:0}
    ])
    const [mainName, setMainName] = useState(
        {person: '', amount:0}
    )
    const [eventName, setEventName] = useState("")
    
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

    const handleOnChangePersonField = (index, event) => {
        const fields = [...persons]
        fields[index]['person'] = event.target.value;
        setPersons(fields)
        console.log(fields)
    }

    const handleOnChangeAmountField = (index, event) => {
        const fields = [...persons]
        fields[index]['amount'] = event.target.value;
        setPersons(fields)
    }

    const handleEventChangeField = (event) => {
        setEventName(event.target.value)
    }

    const handleMainNameChange = (e) => {
        let field = JSON.parse(JSON.stringify(mainName))
        field.person = e.target.value
        setMainName(field)
    }

    const handleMainAmountChange = (e) => {
        let field = JSON.parse(JSON.stringify(mainName))
        field.amount = Number(e.target.value)
        setMainName(field)
    }


    const onFormSubmit = () => {
        let fields = [... persons]
        fields.unshift(JSON.parse(JSON.stringify(mainName)))
        localStorage.setItem('eventName', eventName)
        localStorage.setItem("persons", JSON.stringify(fields))
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
                        label="Event Name"
                        value={eventName}
                        onChange={e => handleEventChangeField(e)}
                        required={true}/>
                </DialogContent>
                <DialogTitle sx={{paddingBottom:0}}>Who to split?</DialogTitle>
                <DialogContent>
                        <TextField 
                            variant='standard'
                            autoFocus 
                            margin='dense'
                            label="Your Name"
                            sx={{width:"25%", m:1}}
                            required={true}
                            value={mainName.person}
                            onChange={e => handleMainNameChange(e)}/>
                        <TextField 
                            variant='standard'
                            className='amount'
                            autoFocus 
                            margin='dense'
                            label="Amount Paid"
                            sx={{width:"25%", m:1}}
                            required={true}
                            value={Number(mainName.amount)}
                            onChange={e => handleMainAmountChange(e)}/>
                        {persons.map( (personObj, index) => (
                            <div key={index}>
                                <TextField 
                                    variant='standard' 
                                    autoFocus 
                                    margin='dense'
                                    label={"Person " + (index+2)}
                                    sx={{width:"25%", m:1}}
                                    value={personObj.person}
                                    onChange={event => handleOnChangePersonField(index, event)}
                                    required={true}/>
                                <TextField 
                                    variant='standard' 
                                    autoFocus 
                                    margin='dense'
                                    label="Amount Paid"
                                    sx={{width:"25%", m:1}}
                                    required={true}
                                    value={personObj.amount}
                                    type='number'
                                    onChange={e => handleOnChangeAmountField(index, e)}/>
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
                    <Button onClick={onFormSubmit} href='/summary'>Next</Button>
                </DialogActions>
            </Dialog>            
        </div>
    )
}
