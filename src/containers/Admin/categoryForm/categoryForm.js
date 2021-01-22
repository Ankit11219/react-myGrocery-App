import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/action/index';
import axios from '../../../apiCall-axios';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import classes from './categoryForm.css';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ImagePicker from '../../../components/UI/ImagePicker/ImagePicker';

class CategoryForm extends Component {
    state = {
        categoryForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Category Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Category description'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        selectedFile: null,
        previewImage: null
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

    onFileUpload = (event) => {
        if (event.target.files) {
            let formIsValid = true;
            for (let inputIdentifier in this.state.categoryForm) {
                formIsValid = this.state.categoryForm[inputIdentifier].valid && formIsValid;
            }

            this.setState({
                selectedFile: event.target.files[0],
                previewImage: URL.createObjectURL(event.target.files[0]),
                formIsValid: formIsValid
            });

        }
    }

    inputChangedHandler = (event, categoryKeyName) => {

        const updatedCategoryForm = {
            ...this.state.categoryForm,
            [categoryKeyName]: {
                ...this.state.categoryForm[categoryKeyName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.categoryForm[categoryKeyName].validation),
                touched: true
            }

        }

        let formIsValid = true;
        for (let inputIdentifier in updatedCategoryForm) {
            formIsValid = updatedCategoryForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ categoryForm: updatedCategoryForm, formIsValid: formIsValid });
    }

    submitCategory = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // Update the formData object 
        formData.append(
            "imageLink",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        for (let key in this.state.categoryForm) {
            if (key !== 'imageLink')
                formData.append([key], this.state.categoryForm[key].value);
        }

        this.props.createCategory(formData);// payload send to backend through redux
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.categoryForm) {
            formElementArray.push({
                id: key,
                config: this.state.categoryForm[key]
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

        let categoryForm = (<form>
            <ImagePicker id="cat_image" previewImage={this.state.previewImage}
                changed={(event) => this.onFileUpload(event)} />
            {form}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={(e) => this.submitCategory(e)}>SUBMIT</Button>
        </form>);
        if (this.props.loading) {
            categoryForm = <Spinner />
        }
        return (
            <div className={classes.Category}>
                {categoryForm}
                {/* <Button btnType="Danger" clicked={() => this.switchToLogin()}>SWITCH TO LOGIN</Button> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.category.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        createCategory: (payload) => dispatch(actions.createCategory(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CategoryForm, axios));