import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Signup from './containers/Auth/Signup/Signup';
import Login from './containers/Auth/Login/Login';
import AdminDashboard from './containers/Admin/dashboard/dashboard';
import UserDashboard from './containers/AccountAdminstrator/dashboard/dashboard';
import CategoryForm from './containers/Admin/categoryForm/categoryForm';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/signup' exact component={Signup} />
            <Route path='/login' exact component={Login} />
            <Route path='/admin/add-category' exact component={CategoryForm}/>
            <Route path='/admin' exact component={AdminDashboard} />
            <Route path='/' component={UserDashboard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
