import React, { lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';

// import './App.css';

import { GlobalStyle } from './global.styles';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

//import HomePage from './pages/homepage/homepage.component';
//import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.components';
import ErrorBoundary from './components/error-boundry/error-boundary.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import CheckoutPage from './pages/checkout/checkout.component';
//import { auth, createUserProfileDocument } from './firebase/firebase.utils';
//import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';
//import { setCurrentUser } from './redux/user/user.actions';
//import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import { checkUserSession } from "./redux/user/user.actions"

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

//const App = ({ checkUserSession, currentUser }) => {
const App = () => {
  // receive state object
  // the currentUser will update when the useSelector value has changed
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<div></div>}>
            <Route exact path='/' component={HomePage}></Route>
            <Route path='/shop' component={ShopPage}></Route>
            <Route exact path='/checkout' component={CheckoutPage}></Route>
            <Route exact path='/signin' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) }></Route>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

// class App extends React.Component {
//   unsubscribeFromAuth = null;

//   componentDidMount() {
//     const { checkUserSession } = this.props;
//     checkUserSession();
//     //const { setCurrentUser } = this.props;
//     //const {setCurrentUser, collectionsArray} = this.props;
//     // make request to firestore API
//     // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//     //   //createUserProfileDocument(user);
//     //   //this.setState({ currentUser: user });

//     //   //console.log(user);

//     //   // pass whole user object with uid 
//     //   if (userAuth){
//     //     const userRef = await createUserProfileDocument(userAuth);

//     //     // listen to the changes of values
//     //     userRef.onSnapshot(snapShot => {
//     //       // call redux method to set current object
//     //       setCurrentUser({
//     //           id: snapShot.id,
//     //           ...snapShot.data()
//     //       });
//     //     });
//     //   }

//     //   setCurrentUser(userAuth);
//       //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})) )
//     // });
//   }

//   componentWillUnmount() {
//     this.unsubscribeFromAuth();
//   }

//   render(){

//     return (
//       <div>
//         <Header />
//         <Switch>
//           <Route exact path='/' component={HomePage}></Route>
//           <Route path='/shop' component={ShopPage}></Route>
//           <Route exact path='/checkout' component={CheckoutPage}></Route>
//           <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) }></Route>
//         </Switch>
//       </div>
//     );
//   }
// }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  //collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
