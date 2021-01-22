import React from 'react';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Logo from '../../UI/Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from '../../UI/Button/Button';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.isOpen)
        attachedClasses = [classes.SideDrawer, classes.Open];

    let user = null;
    if (props.userName) {
        user = (<div className={classes.UserInfo}>
            <div style={{ fontWeight: 600 }}>Welcome</div>
            <div style={{ fontStyle: 'italic' }}>{props.userName}</div>
        </div>);
    }
    else {
        user = (<Button btnType="Success"
            clicked={props.authenticate}>LOGIN</Button>)
    }


    return (
        <Aux>
            <Backdrop show={props.isOpen} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.SideDrawerHeader}>
                    <Logo height="50px" />
                    {user}
                </div>

            </div>
        </Aux>);
}

export default sideDrawer;