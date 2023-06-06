import React, { Fragment, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

// DEFAULT AUTH TOKEN
import setAuthToken from './utils/setAuthToken';

// CONTEXT
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

// ROUTING COMPONENTS
import PrivateRoute from './components/routing/PrivateRoute';

// LAYOUT COMPONENTS
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

// PAGES COMPONENTS
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  {/* <PrivateRoute exact path='/' element={ <Home /> } /> */}
                  <Route exact path='/' element={ <PrivateRoute /> } >
                    <Route exact path='/' element={ <Home /> } />
                  </Route>
                  <Route exact path='/about' element={ <About /> } />
                  <Route exact path='/register' element={ <Register /> } />
                  <Route exact path='/login' element={ <Login /> } />
                </Routes>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
