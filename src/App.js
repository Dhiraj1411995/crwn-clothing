import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Route,Switch} from 'react-router-dom';

const HatsPage = () =>(
  <div>
    <h1>THIS IS HATS PAGE</h1>
  </div>
)

const JacketsPage = () =>(
  <div>
    <h1>THIS IS JACKETS PAGE</h1>
  </div>
)

const SneakersPage = () =>(
  <div>
    <h1>THIS IS SNEAKERS PAGE</h1>
  </div>
)

const WomensPage = () =>(
  <div>
    <h1>THIS IS WOMEN PAGE</h1>
  </div>
)
const MensPage = () =>(
  <div>
    <h1>THIS IS MEN PAGE</h1>
  </div>
)

function App() {
  return (
    <div>
      {/* <HomePage /> */}
      {/* <Switch> */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/hats" component={HatsPage} />
        <Route exact path="/jackets" component={JacketsPage} />
        <Route exact path="/sneakers" component={SneakersPage} />
        <Route exact path="/womens" component={WomensPage} />
        <Route path="/mens" component={MensPage} />
      {/* </Switch> */}
    </div>
  );
}

export default App;
