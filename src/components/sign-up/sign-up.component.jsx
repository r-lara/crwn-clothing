import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import { connect } from 'react-redux'

import './sign-up.styles.scss'

import CustomButton from '../../components/custom-button/custom-button.component'

import { signUpStart } from '../../redux/user/user.actions'

class SignUp extends Component {
    state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    handleSubmit = async e => {
        e.preventDefault()
        const { signUpStart } = this.props
        const { displayName, email, password, confirmPassword } = this.state

        if( password !== confirmPassword ){
            alert(`Passwords don't match`);
            return;
        }

        signUpStart({ email, password, displayName })
  
        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

    }
    handleChange = e => {
        e.preventDefault()
        const { value, name } = e.target
        this.setState({ [name]: value })
    }
    render() {
        return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sign up with your email and passowrd</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="text" 
                        name='displayName'
                        label='Name'
                        handleChange={this.handleChange} 
                        value={this.state.displayName}
                        required
                        />
                    <FormInput 
                        type="email" 
                        name='email'
                        label='Email'
                        handleChange={this.handleChange} 
                        value={this.state.email}
                        required
                        />
                    <FormInput 
                        type="password" 
                        name='password' 
                        label='Password'
                        handleChange={this.handleChange} 
                        value={this.state.password}
                        required
                        />
                    <FormInput 
                        type="password" 
                        name='confirmPassword' 
                        label='Confirm Password'
                        handleChange={this.handleChange} 
                        value={this.state.confirmPassword}
                        required
                        />
                    <CustomButton>Sign up</CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})
export default connect(
    null, 
    mapDispatchToProps
)(SignUp);
