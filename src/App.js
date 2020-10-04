import React, { Component } from 'react';
import  { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { setCurrentUser } from './redux/user/user.action';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from './pages/checkout/checkout';


class App extends Component {

  unsubscribeFormAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;
    //coming  from firebase auth 
    //open subscription as long as app is mounted on dom
    this.unsubscribeFormAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
              setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
              })
          });
      } else {
        setCurrentUser(userAuth)
      }
      
    })
  }

  componentWillUnmount() {
    this.unsubscribeFormAuth();
  }

  render() {
    return (  
      <div>
        {/* header is aware of user signin or signout */}
        <Header />
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route  path='/shop' component={ShopPage} />
            <Route  exact path='/checkout' component={CheckoutPage} />
            <Route 
              exact 
              path='/signin' 
              render={()=> 
              this.props.currentUser ? (<Redirect to='/' />): (<SignInAndSignUp />)} />
        </Switch>
      </div> 
    )
  }
}
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
