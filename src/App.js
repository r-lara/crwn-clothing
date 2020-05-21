import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

// pages
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

// comp
import Header from './components/header/header.component'

const ContactPage = () => (<div>
  <h1>contact</h1>
</div>)

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
        <Route path='/contact' component={ContactPage} />
        {/* <Route path='/shop/:category' component={HatsPage} /> */}
      </Switch>
    </div>
  );
}

export default App;
