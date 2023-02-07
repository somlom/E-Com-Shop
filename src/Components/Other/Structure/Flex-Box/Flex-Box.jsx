import React from 'react'


const get_class = (staticClass, className) => {
    if (className) {
        return (staticClass + ' ' + className)
    } else {
        return staticClass
    }
}

export const Column = ({ className, children }) => {
    return (
        <div className={get_class('column', className)}>{children}</div>
    )
}

export const Row = ({ className, children }) => {
    return (
        <div className={get_class('row', className)}>{children}</div>
    )
}