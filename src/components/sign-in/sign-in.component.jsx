import React, { Component } from 'react'

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }
    handleSubmit = async e => {
        e.preventDefault()

        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email, password);
        this.setState({ email: '', password: '' });
    }

    handleChange = e => {
        e.preventDefault()
        const { value, name } = e.target;
        this.setState({ [name]: value })
    }
    render() {
        const { googleSignInStart } = this.props
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
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const matDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password })),
})

export default connect(null, matDispatchToProps)(SignIn)
