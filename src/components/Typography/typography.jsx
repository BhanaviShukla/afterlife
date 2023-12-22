import React from 'react'

const Typography = ({
    variant = 'paragraph',
    className, 
    children,
}) => {
    const component = (() => {
        switch (variant) {
        case 'title':
        case 'h1':
            return <h1 className={`title ${className}`}>{children}</h1>
        case 'title-small':
        case 'h2': 
            return <h2 className={`title-small ${className}`}>{children}</h2>
        case 'subtitle':
        case 'h4': 
            return <h4 className={`subtitle ${className}`}>{children}</h4>
        case 'heading':
        case 'h6': 
            return <h6 className={`heading ${className}`}>{children}</h6>
        case 'caption':
            return <span className={`caption ${className}`}>{children}</span>
        case 'paragraph':
        default:
            return <p className={`${className}`}>{children}</p>
    }})()
    return component 
}

export default Typography