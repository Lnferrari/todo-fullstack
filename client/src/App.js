import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Registration from './pages/Registration';

import './App.css';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <Router>
        <Switch>
          <Route exact path='/' component={Registration} />
          {/* <Route />
          <Route />
          <Route /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
