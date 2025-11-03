/*==================================================
src/components/Credits.js

I display credits and let the user add new ones.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
  render() {
    return (
      <div>
        <h1>Credits</h1>

        {/* I show link back home */}
        <Link to="/">Home</Link>
        <br /><br />

        {/* I show each credit entry */}
        {this.props.credits.map((credit, index) => (
          <div key={index}>
            <p>Description: {credit.description}</p>
            <p>Amount: ${Number(credit.amount).toFixed(2)}</p>
            <p>Date: {credit.date.slice(0, 10)}</p>
            <hr />
          </div>
        ))}

        {/* I form to add a credit */}
        <form onSubmit={(e) => {
          e.preventDefault();

          const newCredit = {
            description: e.target.description.value,
            amount: parseFloat(e.target.amount.value),
            date: new Date().toISOString()
          };

          this.props.addCredit(newCredit);
          e.target.reset();
        }}>
          <input name="description" type="text" placeholder="Description" required />
          <input name="amount" type="number" step="0.01" placeholder="Amount" required />
          <button type="submit">Add Credit</button>
        </form>

        <br />

        {/* I show the updated balance */}
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}

export default Credits;


