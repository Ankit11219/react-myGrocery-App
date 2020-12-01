import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Signup from './containers/Auth/Signup/Signup';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          {/* <Switch>
            <Route path="/signup" component={Signup} />
          </Switch> */}
          <Signup/>
        </Layout>
      </div>
    );
  }
}

export default App;
