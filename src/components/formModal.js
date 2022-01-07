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

    // minimises number of senders
    const normalSplit = (expensesMap) => {
        console.log(expensesMap)
        var total = 0;
        for (var person in expensesMap) {
            total += expensesMap[person]
        }
        const avgCost = total/Object.keys(expensesMap).length;
        var personToIndexMap = {}
        var transaction = []
        var counter = 0;
        for (var p in expensesMap) {
            // how much the person needs to pay/get back from central pot
            // +ve diff = need to get back, -ve means need to pay
            var diff = expensesMap[p] - avgCost 
            console.log("diff", diff)
            transaction.push([p, diff])
            personToIndexMap[p] = counter;
            counter++;
        }
        console.log("transaction", transaction)
        transaction.sort((p1, p2) => p1[1] - p2[1]);
        console.log("transaction", transaction)
        var left = 0;
        var right = transaction.length - 1;
        while (left < right) {
            const debtor = transaction[left];
            const creditor = transaction[right];

            var min = Math.min(-debtor[1], creditor[1]);
            debtor[1] += min;
            creditor[1] -= min;
            console.log(debtor[0], "pays", creditor[0], min)

            if (debtor[1] === 0) {
                left++;
            } else if (creditor[1] === 0) {
                right--;
            } 
        }
    }

    // maximises number of senders, so that each person doesnt need to send too many times
    const normalSplit2 = (expensesMap) => {
        var total = 0;
        for (var person in expensesMap) {
            total += expensesMap[person]
        }
        const avgCost = total/Object.keys(expensesMap).length;
        var personToIndexMap = {}
        var transaction = []
        var counter = 0;
        for (var p in expensesMap) {
            // how much the person needs to pay/get back from central pot
            // +ve diff = need to get back, -ve means need to pay
            var diff = expensesMap[p] - avgCost 
            transaction.push([p, diff])
            personToIndexMap[p] = counter;
            counter++;
        }
        const comparator = (p1, p2) => p1[1] - p2[1];
        transaction.sort(comparator);
        var left = 0;
        var right = transaction.length - 1;
        while (left < right) {
            const debtor = transaction[left];
            const creditor = transaction[right];
            const transfer = -debtor[1]
            debtor[1] -= transfer;
            creditor[1] -= transfer;
            var newArr = []
            for (var i = 0; i < transaction.length; i++) {
                var tuple = transaction[i]
                if (tuple[1] === 0) {
                    continue;
                }
                newArr.push(tuple)
            }
            transaction = newArr
            transaction.sort(comparator);
            right = transaction.length - 1
        }
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
