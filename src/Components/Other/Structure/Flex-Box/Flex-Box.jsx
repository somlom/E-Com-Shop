import React from 'react'

export const Column = (props) => {
    return (
        <div className={'column ' + props.className}>{props.children}</div>
    )
}

export const Row = (props) => {
    return (
        <div className={'row ' + props.className}>{props.children}</div>
    )
}