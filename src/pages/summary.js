import React from 'react'

export default function Summary() {

    const mainName = localStorage.getItem("mainName")
    const persons = JSON.parse(localStorage.getItem("persons"))
    const eventName = localStorage.getItem("eventName")
    return (
        <div>
            <h1>This is the summary page</h1>
        </div>
    )
}
