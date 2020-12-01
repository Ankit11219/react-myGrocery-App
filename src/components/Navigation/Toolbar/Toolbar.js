import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../UI/Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerOpenClicked} />
        <Logo height="80%" />
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;
