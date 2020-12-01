import React from 'react';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Logo from '../../UI/Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.isOpen)
        attachedClasses = [classes.SideDrawer, classes.Open];

    return (
        <Aux>
            <Backdrop show={props.isOpen} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" />
            </div>
        </Aux>);
}

export default sideDrawer;