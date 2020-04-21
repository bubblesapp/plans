import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {NewPlan} from "./components/NewPlan";
import {Plan} from "./components/Plan";
import {APIProvider} from "./api/useAPI";

function App() {
  return (
    <div className="App">
      <APIProvider>
        <Router>
            <Switch>
              <Route path="/:id" children={<Plan />} />
              <Route path="/">
                <NewPlan />
              </Route>
            </Switch>
        </Router>
      </APIProvider>
    </div>
  );
}

export default App;
