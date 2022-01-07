import React from 'react'

export default function Summary() {

    const mainName = localStorage.getItem( "mainName" )
    const persons = JSON.parse( localStorage.getItem( "persons" ) )
    const eventName = localStorage.getItem( "eventName" )

    const processJson = (spendings) => {
        const expensesMap = {}
        for (var i = 0; i < spendings.length; i++) {
            expensesMap[spendings.person] = spendings.amount;
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
            console.log( "diff", diff )
            transaction.push( [ p, diff ] )
            personToIndexMap[ p ] = counter;
            counter++;
        }
        console.log( "transaction", transaction )
        transaction.sort( ( p1, p2 ) => p1[ 1 ] - p2[ 1 ] );
        console.log( "transaction", transaction )
        var left = 0;
        var right = transaction.length - 1;
        while ( left < right ) {
            const debtor = transaction[ left ];
            const creditor = transaction[ right ];

            var min = Math.min( -debtor[ 1 ], creditor[ 1 ] );
            debtor[ 1 ] += min;
            creditor[ 1 ] -= min;
            console.log( debtor[ 0 ], "pays", creditor[ 0 ], min )

            if ( debtor[ 1 ] === 0 ) {
                left++;
            } else if ( creditor[ 1 ] === 0 ) {
                right--;
            }
        }
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

    return (
        <div>
            <h1>This is the summary page</h1>
        </div>
    )
}
