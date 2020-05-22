import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        pwd: '',
    }
    handleSubmit = e => {
        e.preventDefault()
    }
    handleChange = e => {
        e.preventDefault()
        const { value, name } = e
        this.setState({ [name]: value })
    }
    render() {
        return (
            <div className='sign-in'>
                <h2>I dont have an account</h2>
                <span>Sign up with your email and passowrd</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="name" 
                        name='name'
                        label='Name'
                        handleChange={this.handleChange} 
                        value={this.state.name}
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
                        type="pwd" 
                        name='pwd' 
                        label='Confirm Password'
                        handleChange={this.handleChange} 
                        value={this.state.pwd}
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
                </form>
            </div>
        )
    }
}

export default SignUp
