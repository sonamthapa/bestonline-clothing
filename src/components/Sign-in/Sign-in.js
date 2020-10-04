import React, { Component } from 'react';

import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { auth, signInWithGoogle } from '../../firebase/firebase.util';

import './Sign-in.styles.scss';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleSubmit = async event => {
        event.preventDefault()
        
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: ''});
        } catch (error) {
            console.log(error);
        }
    }
    handleChange = event => {
        const  { value, name } = event.target;
        this.setState({[name]: value})
    }
    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email"
                        value={this.state.email} 
                        handleChange ={this.handleChange}
                        label = "email"
                        required />
                    <FormInput 
                        name="password" 
                        type="password"
                        value={this.state.password} 
                        handleChange = {this.handleChange}
                        label="password"
                        required />
                    <div className='buttons'>
                        <Button type="submit" >SIGN IN</Button> 
                        <Button onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google</Button> 
                    </div>

                </form>
            </div>
        )
    }
}
export default SignIn;