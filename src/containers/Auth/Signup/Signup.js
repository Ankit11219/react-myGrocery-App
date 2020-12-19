import React, { Component } from 'react';
import classes from './Signup.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../apiCall-axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/action/index';
import { connect } from 'react-redux';

class Signup extends Component {
    state = {
        signupForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Mobile No. (Optional)'
                },
                value: '',
                validation: {
                    isPhone: true
                },
                valid: true,
                touched: true
            },
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

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /\S+@\S+\.\S+/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isPhone) {
            if (value.trim()) {
                const pattern = /^[1-9][0-9]{9}$/;
                isValid = pattern.test(value) && isValid;
            }
            else
                isValid = true;
        }

        if (rules.isPassword) {
            const pattern = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%_]).{6,20})/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, signupName) => {
        const updatedSignupForm = {
            ...this.state.signupForm,
            [signupName]: {
                ...this.state.signupForm[signupName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.signupForm[signupName].validation),
                touched: true
            }

        }

        let formIsValid = true;
        for (let inputIdentifier in updatedSignupForm) {
            formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ signupForm: updatedSignupForm, formIsValid: formIsValid });
    }

    switchToLogin = () => {
        console.log(this.props);
        this.props.history.push('/login');
    }

    submitSignup = (e) => {
        e.preventDefault();
        // this.setState({ loading: true });
        const submitPaylod = {};
        for (let key in this.state.signupForm) {
            submitPaylod[key] = this.state.signupForm[key].value;
        }

        this.props.signup(submitPaylod);

        // axios.post('/users/signup', submitPaylod).then(res => {
        //     console.log(res);
        //     this.setState({ loading: false });
        // }).catch(err => {
        //     console.log(err);
        //     this.setState({ loading: false });
        // })
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.signupForm) {
            formElementArray.push({
                id: key,
                config: this.state.signupForm[key]
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

        let signupForm = (<form>
            {form}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={(e) => this.submitSignup(e)}>SUBMIT</Button>
        </form>);
        if (this.props.loading) {
            signupForm = <Spinner />
        }

        return (
            <div className={classes.Signup}>
                {signupForm}
                {/* <form>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={(e) => this.submitSignup(e)}>SUBMIT</Button>
                </form> */}
                <Button btnType="Danger" clicked={() => this.switchToLogin()}>SWITCH TO LOGIN</Button>
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
        signup: (signupPayload) => dispatch(actions.signup(signupPayload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Signup, axios));