import React, { Component } from 'react';
import classes from './Signup.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

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
                    placeholder: 'Mobile No.'
                },
                value: '',
                validation: {
                    required: true,
                    isPhone: true
                },
                valid: false,
                touched: false
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
            const pattern = /^\d{10}$/;
            isValid = pattern.test(value) && isValid;
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

        return (
            <div className={classes.Signup}>
                <form>
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Signup;