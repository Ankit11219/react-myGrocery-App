import React from 'react';
import classes from './Logo.css'

import groceryLogo from '../../../assets/images/groceryLogo.jpg';

const logo = (props) => (
<div className={classes.Logo} style={{height: props.height}}>
    <img src={groceryLogo} alt="MyGrocery" />
    {props.children}
</div>
);

export default logo;