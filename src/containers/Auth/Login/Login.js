import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Login.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../apiCall-axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/action/index';
class Login extends Component {
    state = {
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    isPassword: true
                },
                valid: false,
                touched: false
            }

        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }


        if (rules.isEmail) {
            const pattern = /\S+@\S+\.\S+/;
            isValid = pattern.test(value) && isValid;
        }


        if (rules.isPassword) {
            const pattern = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%_]).{6,20})/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, loginName) => {
        const updatedloginForm = {
            ...this.state.loginForm,
            [loginName]: {
                ...this.state.loginForm[loginName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.loginForm[loginName].validation),
                touched: true
            }

        }

        let formIsValid = true;
        for (let inputIdentifier in updatedloginForm) {
            formIsValid = updatedloginForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ loginForm: updatedloginForm, formIsValid: formIsValid });
    }

    switchToSignup = () => {
        this.props.history.push('/signup');
    }

    submitLogin = (e) => {
        e.preventDefault();
        const submitPaylod = {};
        for (let key in this.state.loginForm) {
            submitPaylod[key] = this.state.loginForm[key].value;
        }

        this.props.login(submitPaylod);
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.loginForm) {
            formElementArray.push({
                id: key,
                config: this.state.loginForm[key]
            });
        }

        const form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        let loginForm = (<form>
            {form}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={(e) => this.submitLogin(e)}>LOGIN</Button>
        </form>);
        if (this.props.loading) {
            loginForm = <Spinner />
        }

        return (
            <div className={classes.Login}>
                {loginForm}
                {/* <form>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={(e) => this.submitlogin(e)}>SUBMIT</Button>
                </form> */}
                <Button btnType="Danger" clicked={()=> this.switchToSignup()}>SWITCH TO SIGNUP</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (loginPayload) => dispatch(actions.login(loginPayload))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Login, axios));