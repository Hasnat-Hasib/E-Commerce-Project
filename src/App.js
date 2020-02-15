import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import Header from './components/header/header.component';

import './App.css';

import SignInAndSignUpPage from './pages//sign-in-and-sign-up/sign-in-and-sign-up.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {aut, createUserProfileDocument} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';



class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount (){
      const { setCurrentUser } = this.props;
      
      this.unsubscribeFromAuth = aut.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
            setCurrentUser ({
              id: snapShot.id,
              ...snapShot.data()
            });
        });
      }
      setCurrentUser(userAuth);
      });
    }

    componentWillUnmount(){
      this.unsubscribeFromAuth();
    }


    render (){

    return (
      <div>
        
        <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render = {()=>
               this.props.currentUser? (
                 <Redirect to='/' />
               ) : (
                 <SignInAndSignUpPage />
               )}
               />
               
          </Switch>
        </BrowserRouter>
      </div>
      
    );


  }


  
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps) (App);

