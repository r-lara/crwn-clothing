import React, { Component } from 'react'

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }
    handleSubmit = e => {
        e.preventDefault()
        console.log('submit from', this.state)
    }
    handleChange = e => {
        e.preventDefault()
        const { value, name } = e.target;
        this.setState({ [name]: value })
    }
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and passowrd</span>

                <form onSubmit={this.handleSubmit}>
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
                    <div className="buttons">
                        <CustomButton>Sign in</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn
