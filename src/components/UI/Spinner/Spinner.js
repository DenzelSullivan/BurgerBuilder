import React from 'react';
import styles from './Spinner.module.css';

const spinner = () => (
    // code and style used to create this spinner came from 
    // https://projects.lukehaas.me/css-loaders/
    
    <div className={styles.loader}>Loading...</div>
);

export default spinner;