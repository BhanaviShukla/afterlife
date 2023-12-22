import React from "react";
import styles from './buttonStyles.module.css'

/**
 * Description: Button
 * @param {any} children - text for the button
 * @param {any} variant='filled' | 'outlined' | 'text'
 * @param {any} props - passthrough props to button
 * @returns {any}
 */
const Button = ({ children, variant = 'filled', ...props }) => {
    return <button {...props} className={`${styles.button} ${styles[variant]}`}><label>{children}</label></button>
}

export default Button