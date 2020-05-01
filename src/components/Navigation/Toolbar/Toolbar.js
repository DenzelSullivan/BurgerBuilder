import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerMenu from '../SideDrawer/HamburgerMenu/HamburgerMenu';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <HamburgerMenu clicked={props.open}/>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;