import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom'

import Index from './Pages/index'
import Search from './Pages/search';


const Routes: React.FC = () => {
  return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/search" exact component={Search} />
        </Switch>
      </BrowserRouter>
  );
}

export default Routes;