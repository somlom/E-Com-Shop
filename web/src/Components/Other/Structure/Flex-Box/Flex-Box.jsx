const get_class = (staticClass, className) => {
    if (className) {
        return staticClass + ' ' + className
    } else {
        return staticClass
    }
}

export const Column = ({ className, style, children }) => {
    return <div className={get_class('column', className)} style={style}>{children}</div>
}

export const Row = ({ className, style, children }) => {
    return <div className={get_class('row', className)} style={style}>{children}</div>
}
