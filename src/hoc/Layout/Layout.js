import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerOpenHandler = () => {
        this.setState({ showSideDrawer: true });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerOpenClicked={this.sideDrawerOpenHandler} />
                <SideDrawer isOpen={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}
                    userName={this.props.userName} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        userName: state.auth.userInfo ? state.auth.userInfo.name : ''
    };
};

export default connect(mapStateToProps, null)(Layout);