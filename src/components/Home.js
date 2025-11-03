/*==================================================
src/components/Home.js

I display the home page and the navigation links.
==================================================*/
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <img src="https://picsum.photos/200/200" alt="bank" />

        <h1>Bank of React</h1>

        {/* I added navigation links so I can move between pages */}
        <Link to="/userProfile">User Profile</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/credits">Credits</Link> {/* I linked to the Credits page */}
        <br />
        <Link to="/debits">Debits</Link> {/* I linked to the Debits page */}
        <br /><br />

        {/* I show the current account balance on the homepage */}
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}

export default Home;
