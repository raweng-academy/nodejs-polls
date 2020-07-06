import React from 'react';
import './index.css';
import Poll from "./components/poll";
import List from "./components/list";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import CreatePoll from './components/createPoll';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="appHeader">
          <nav className="nav">
            <ul>
              <li className="nav-links">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create Poll</Link>
              </li>
              <li>
                <Link to="/polls/random">Random Poll</Link>
              </li>
            </ul>
          </nav>
        <div className="appBody">
          <Switch>            
            <Route exact path="/">
              <List />
            </Route>
            <Route exact path="/create">
              <CreatePoll />
            </Route>            
            <Route path="/polls/:id" >
              <Poll />
            </Route>
          </Switch>
        </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
