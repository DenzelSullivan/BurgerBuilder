import React, { Component } from "react";
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import styles from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
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
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        isFormValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {};
        for (let formEleId in this.state.orderForm){
            formData[formEleId] = this.state.orderForm[formEleId].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price ,// in prod calc on the server side
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error)
                this.setState({ loading: false });
            });
    }

    isValid(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // copy of outer form object. name, email, ect...
        const updatedOrderForm = { ...this.state.orderForm }
        // copy of inner form object. type, config, value
        const updatedFormEle = { ...updatedOrderForm[inputIdentifier] };
        updatedFormEle.value = event.target.value;
        updatedFormEle.valid = this.isValid(updatedFormEle.value, updatedFormEle.validation)
        updatedFormEle.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormEle;

        let isFormValid = true;
        for(let inputId in updatedOrderForm){
            isFormValid = updatedOrderForm[inputId].valid && isFormValid;
        }
        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid})
    }

    render() {
        const formEleArray = [];
        for (let key in this.state.orderForm) {
            formEleArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler} >
                {formEleArray.map(formEle => (
                    <Input 
                        key={formEle.id}
                        elementType={formEle.config.elementType} 
                        elementConfig={formEle.config.elementConfig}
                        value={formEle.config.value}
                        invalid={!formEle.config.valid}
                        shouldValidate={formEle.config.validation}
                        touched={formEle.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formEle.id)} />
                ))}
                <Button btnType="Success"
                    disabled={!this.state.isFormValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);