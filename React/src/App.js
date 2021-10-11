import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import './App.css';
import Login from './pages/Login';
import Notfound from './pages/Notfound';
import AircraftModule from './pages/modules/aircraft';
import AirportModule from './pages/modules/airport';
import InitializeModule from './pages/modules/initialize';
import ReportsModule from './pages/modules/reports';
import TransactionModule from './pages/modules/transaction';
import ProtectedRoute from './auth/ProtectedRoute';

class App extends React.Component {
  componentDidMount(){
    var el = document.getElementById("wrapper");
    var toggleButton = document.getElementById("menu-toggle");
    if(toggleButton){
        toggleButton.onclick = function () {
        el.classList.toggle("toggled");
        };
    }
  }
  render(){
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route
                path="/admin"
                render={({ match: { path } }) => (
                  <>
                    <ProtectedRoute exact path={`${path}`} component={AdminPage} />
                    <ProtectedRoute path={`${path}/initialize`} exact component={InitializeModule} />
                    <ProtectedRoute path={`${path}/aircraft`} exact component={AircraftModule} />
                    <ProtectedRoute path={`${path}/airport`} exact component={AirportModule} />
                    <ProtectedRoute path={`${path}/transaction`} exact component={TransactionModule} />
                    <ProtectedRoute path={`${path}/reports`} exact component={ReportsModule} />
                  </>
                )}
              />
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
