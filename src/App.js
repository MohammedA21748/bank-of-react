/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    // I set up my global state here
    super();
    this.state = {
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99'
      }
    };
  }

  // I update the username after login
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  // I fetch all credits & debits from the API when the app starts
  async componentDidMount() {
    try {
      const creditResponse = await fetch('https://johnnylaicode.github.io/api/credits.json');
      const creditData = await creditResponse.json();

      const debitResponse = await fetch('https://johnnylaicode.github.io/api/debits.json');
      const debitData = await debitResponse.json();

      this.setState({
        creditList: creditData,
        debitList: debitData
      });
    } catch (error) {
      console.error("I ran into a problem loading the API data:", error);
    }
  }

  // I calculate the live balance from all credits & debits
  calculateBalance = () => {
    const totalCredits = this.state.creditList.reduce((acc, item) => acc + Number(item.amount), 0);
    const totalDebits = this.state.debitList.reduce((acc, item) => acc + Number(item.amount), 0);
    return totalCredits - totalDebits;
  };

  // I add a new credit and recalc balance
  addCredit = (credit) => {
    const updatedCredits = [...this.state.creditList, credit];
    this.setState({ creditList: updatedCredits });
  };

  // I add a new debit and recalc balance
  addDebit = (debit) => {
    const updatedDebits = [...this.state.debitList, debit];
    this.setState({ debitList: updatedDebits });
  };

  render() {
    // I pass props into each page component
    const HomeComponent = () => (
      <Home accountBalance={this.calculateBalance()} />
    );

    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );

    const LogInComponent = () => (
      <LogIn
        user={this.state.currentUser}
        mockLogIn={this.mockLogIn}
      />
    );

    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.calculateBalance()}
      />
    );

    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.calculateBalance()}
      />
    );

    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;


