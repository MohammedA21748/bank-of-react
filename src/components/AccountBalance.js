/*==================================================
src/components/AccountBalance.js

I display the account balance.
==================================================*/
import React, { Component } from 'react';

class AccountBalance extends Component {
  render() {
    // I always show the balance with 2 decimals
    const balance = Number(this.props.accountBalance).toFixed(2);

    return (
      <div>
        <h3>Account Balance: ${balance}</h3>
      </div>
    );
  }
}

export default AccountBalance;

