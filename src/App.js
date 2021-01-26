import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import BSCP_APP from './components/bscp';
import Home from './components/home';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/generate/bscp'} component={BSCP_APP} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;