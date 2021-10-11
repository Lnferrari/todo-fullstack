import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Registration} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
