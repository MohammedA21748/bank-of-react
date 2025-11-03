/*==================================================
src/components/Debits.js

I display debits and let the user add new ones.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
  render() {
    return (
      <div>
        <h1>Debits</h1>

        {/* I show link back home */}
        <Link to="/">Home</Link>
        <br /><br />

        {/* I show each debit entry */}
        {this.props.debits.map((debit, index) => (
          <div key={index}>
            <p>Description: {debit.description}</p>
            <p>Amount: ${Number(debit.amount).toFixed(2)}</p>
            <p>Date: {debit.date.slice(0, 10)}</p>
            <hr />
          </div>
        ))}

        {/* I form to add a debit */}
        <form onSubmit={(e) => {
          e.preventDefault();

          const newDebit = {
            description: e.target.description.value,
            amount: parseFloat(e.target.amount.value),
            date: new Date().toISOString()
          };

          this.props.addDebit(newDebit);
          e.target.reset();
        }}>
          <input name="description" type="text" placeholder="Description" required />
          <input name="amount" type="number" step="0.01" placeholder="Amount" required />
          <button type="submit">Add Debit</button>
        </form>

        <br />

        {/* I show updated balance */}
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}

export default Debits;


