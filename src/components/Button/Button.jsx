import React from "react";
import styles from './buttonStyles.module.css'

/**
 * Description
 * @param {any} variant: 'filled', 'outlined', 'text'
 * @param {any} ...props}
 */
const Button = ({ children, variant = 'filled', ...props }) => {
    return <button {...props} className={`${styles.button} ${styles[variant]}`}><label>{children}</label></button>
}

export default Button