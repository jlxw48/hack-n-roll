import React, { useState, useEffect } from 'react';

export default function Summary() {

    const processJson = ( spendings ) => {
        console.log("spendings", spendings)
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

            var min = Math.min( -debtor[ 1 ], creditor[ 1 ] );
            debtor[ 1 ] += min;
            creditor[ 1 ] -= min;
            payment.push(`${debtor[0]} pays ${creditor[0]} ${min}`)

            if ( debtor[ 1 ] === 0 ) {
                left++;
            } else if ( creditor[ 1 ] === 0 ) {
                right--;
            }
        }

        return {total, payment}
    }

    // maximises number of senders, so that each person doesnt need to send too many times
    const minimiseInconvenience = ( expensesMap ) => {
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
        const comparator = ( p1, p2 ) => p1[ 1 ] - p2[ 1 ];
        transaction.sort( comparator );
        var left = 0;
        var right = transaction.length - 1;
        while ( left < right ) {
            const debtor = transaction[ left ];
            const creditor = transaction[ right ];
            const transfer = -debtor[ 1 ]
            debtor[ 1 ] -= transfer;
            creditor[ 1 ] -= transfer;
            var newArr = []
            for ( var i = 0; i < transaction.length; i++ ) {
                var tuple = transaction[ i ]
                if ( tuple[ 1 ] === 0 ) {
                    continue;
                }
                newArr.push( tuple )
            }
            transaction = newArr
            transaction.sort( comparator );
            right = transaction.length - 1
        }
    }

    const [total, setTotal] = useState(0)
    const [payment, setPayment] = useState([])

    useEffect(() => {
        const mainName = localStorage.getItem( "mainName" )
        // const persons = JSON.parse( localStorage.getItem( "persons" ) )
        const persons = [ { person: "A", amount: 7 }, { person: "B", amount: 10 }, { person: "C", amount: 12 }, { person: "D", amount: 5 } ]
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
