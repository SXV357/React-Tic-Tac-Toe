import React from 'react';

export default function Square({onClick, value}){

    const style = {
        background: 'lightblue',
        border: '2px solid darkblue',
        fontSize: '30px',
        fontWeight: '800',
        cursor: 'pointer',
        outline: 'none'
    };

    return(
        <button style = {style} onClick = {onClick}>{value}</button>
    )
}