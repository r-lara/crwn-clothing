import React, { Component } from 'react'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

class SingIn extends Component {
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
            <div className='sing-in'>
                <h2>I already have an account</h2>
                <span>Sing in with your email and passowrd</span>

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

                    <CustomButton>Sing in</CustomButton>
                </form>
            </div>
        )
    }
}

export default SingIn
