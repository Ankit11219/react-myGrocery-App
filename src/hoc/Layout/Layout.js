import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
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

    redirectLogin = () => {
        console.log("redirect login", this.props);
        this.props.history.push('/login');
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerOpenClicked={this.sideDrawerOpenHandler} />
                <SideDrawer isOpen={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}
                    userName={this.props.userName} authenticate={this.redirectLogin} />
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

const LayoutWithRouter = withRouter(Layout);
export default connect(mapStateToProps, null)(LayoutWithRouter);