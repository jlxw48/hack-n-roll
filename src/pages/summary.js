import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';

export default function Summary() {

    const processJson = ( spendings ) => {
        const expensesMap = {}
        for ( var i = 0; i < spendings.length; i++ ) {
            expensesMap[ spendings[ i ].person ] = Number( spendings[ i ].amount );
        }
        return expensesMap
    }

    // minimises number of senders
    const normalSplit = ( expensesMap ) => {
        var total = 0;
        for ( var person in expensesMap ) {
            total += expensesMap[ person ]
        }
        const avgCost = total / Object.keys( expensesMap ).length;
        var personToIndexMap = {}
        var transaction = []
        var counter = 0;
        for ( var p in expensesMap ) {
            // how much the person needs to pay/get back from central pot
            // +ve diff = need to get back, -ve means need to pay
            var diff = expensesMap[ p ] - avgCost
            transaction.push( [ p, diff ] )
            personToIndexMap[ p ] = counter;
            counter++;
        }
        transaction.sort( ( p1, p2 ) => p1[ 1 ] - p2[ 1 ] );
        var left = 0;
        var right = transaction.length - 1;
        var payment = []
        while ( left < right ) {
            const debtor = transaction[ left ];
            const creditor = transaction[ right ];

            const min = Math.min( -debtor[ 1 ], creditor[ 1 ] );
            console.log( min )
            debtor[ 1 ] += min;
            creditor[ 1 ] -= min;
            payment.push( `${ debtor[ 0 ] } pays ${ creditor[ 0 ] } $${ min.toFixed(2) }` )

            if ( debtor[ 1 ] === 0 ) {
                left++;
            }
            if ( creditor[ 1 ] === 0 ) {
                right--;
            }
        }

        return { total, payment }
    }

    const [ total, setTotal ] = useState( 0 )
    const [ payment, setPayment ] = useState( [] )
    const [ paid, setPaid ] = useState( [] )
    const eventName = localStorage.getItem('eventName')

    useEffect( () => {
        const persons = JSON.parse( localStorage.getItem( "persons" ) )
        var data = processJson( persons )
        const processed = normalSplit( data )
        setTotal( processed.total )
        setPayment( processed.payment )
        setPaid( Array( processed.payment.length ).fill( 0 ) )
    }, [] )

    const onPaidClick = ( e ) => {
        let newPaid = [ ...paid ]
        const i = Number( e.target.id )
        newPaid[ i ] = 1
        setPaid( newPaid )
    }

    return (
        <div>
            <h2 style={{ marginLeft: "15vw" }}>Overview</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper} sx={{ maxWidth: "70vw" }}>
                    <Table sx={{ maxWidth: "70vw" }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <b>Total Amount Spent</b>
                                </TableCell>
                                <TableCell align="right">{total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <br />
            <h2 style={{ marginLeft: "15vw" }}>How to settle debts for {eventName}</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper} sx={{ maxWidth: "70vw" }}>
                    <Table sx={{ maxWidth: "70vw" }} aria-label="simple table">
                        <TableBody>
                            {payment.map( ( line, index ) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <b>{line}</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        {paid[ index ] == 1 ? <p>Done</p> :
                                            <IconButton color='success' size='large' onClick={( e ) => onPaidClick( e )}>
                                                <DoneIcon id={index} />
                                            </IconButton>}
                                    </TableCell>
                                </TableRow>
                            ) )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
