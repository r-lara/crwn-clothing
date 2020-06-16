import React, { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import { connect } from 'react-redux'

import './sign-up.styles.scss'

import CustomButton from '../../components/custom-button/custom-button.component'

import { signUpStart } from '../../redux/user/user.actions'

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const {
        displayName,
        email,
        password,
        confirmPassword,
    } = userCredentials

    const handleSubmit = async e => {
        e.preventDefault()

        if( password !== confirmPassword ){
            alert(`Passwords don't match`);
            return;
        }

        signUpStart({ email, password, displayName })
  
        setUserCredentials({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

    }
    const handleChange = e => {
        e.preventDefault()
        const { value, name } = e.target
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-up'>
            <h2>I do not have an account</h2>
            <span>Sign up with your email and passowrd</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="text" 
                    name='displayName'
                    label='Name'
                    handleChange={handleChange} 
                    value={displayName}
                    required
                    />
                <FormInput 
                    type="email" 
                    name='email'
                    label='Email'
                    handleChange={handleChange} 
                    value={email}
                    required
                    />
                <FormInput 
                    type="password" 
                    name='password' 
                    label='Password'
                    handleChange={handleChange} 
                    value={password}
                    required
                    />
                <FormInput 
                    type="password" 
                    name='confirmPassword' 
                    label='Confirm Password'
                    handleChange={handleChange} 
                    value={confirmPassword}
                    required
                    />
                <CustomButton>Sign up</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})
export default connect(
    null, 
    mapDispatchToProps
)(SignUp);
