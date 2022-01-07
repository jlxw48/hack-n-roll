import React, { useState, useEffect } from 'react';

export default function Summary() {

    const processJson = ( spendings ) => {
        const expensesMap = {}
        for ( var i = 0; i < spendings.length; i++ ) {
            expensesMap[ spendings[i].person ] = spendings[i].amount;
        }
        return expensesMap
    }

    // minimises number of senders
    const normalSplit = ( expensesMap ) => {
        console.log( expensesMap )
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
            console.log(min)
            debtor[ 1 ] += min;
            creditor[ 1 ] -= min;
            payment.push(`${debtor[0]} pays ${creditor[0]} ${min}`)

            if ( debtor[ 1 ] === 0 ) {
                left++;
            }
            if ( creditor[ 1 ] === 0 ) {
                right--;
            }
        }

        return {total, payment}
    }

    const [total, setTotal] = useState(0)
    const [payment, setPayment] = useState([])

    useEffect(() => {
        const mainName = localStorage.getItem( "mainName" )
        // const persons = JSON.parse( localStorage.getItem( "persons" ) )
        const persons = [ { person: "A", amount: 0 }, { person: "B", amount: 10 }, { person: "C", amount: 12 }, { person: "D", amount: 5 } ]
        const eventName = localStorage.getItem( "eventName" )
        var data = processJson(persons)
        const processed = normalSplit(data)
        setTotal(processed.total)
        setPayment(processed.payment)
    }, [])

    return (
        <div>
            <h1 id='mainTitle'>Split Da Bill</h1>

            <h2 id='subheader'>Summary</h2>
            <div>
               <p>Total amount spent: {total}</p>
               {payment.map((line) => {return (<p>{line}</p>)})}
            </div>
        </div>
    )
}
