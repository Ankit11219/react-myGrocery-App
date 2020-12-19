import React, { Component } from 'react';

import DialogBox from '../../components/UI/DialogBox/DialogBox';
import Aux from '../Auxiliary/Auxiliary';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null }); // to clear the previos error
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => {
                // console.log(res);
                return res;
            }, error => {
                console.log(error);
                // console.log(error.response.data,error.response.status,error.response.headers);
                this.setState({ error: error.response.data }); // show popup with error msg come from backend
            })
        }

        componentWillUnmount() { //prevent for memory leak
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {// use for closed the dialog box
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <DialogBox show={this.state.error}
                        dialogBoxClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null};
                </DialogBox>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;