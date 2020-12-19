import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Signup from './containers/Auth/Signup/Signup';
import Login from './containers/Auth/Login/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/signup' component={Signup} />
            <Route path='/login' exact component={Login} />
            <Route path='/' exact component={Login} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
