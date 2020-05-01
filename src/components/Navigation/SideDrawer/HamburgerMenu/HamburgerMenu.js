import React from 'react';
import styles from './HamburgerMenu.module.css';

const hamburgerMenu = (props) => (
    <div className={styles.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default hamburgerMenu;

