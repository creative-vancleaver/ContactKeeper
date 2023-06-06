import React, { useContext } from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom';

// CONTEXT
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  console.log(authContext);

  return (

    // <Route 
    //   { ...rest }
    //   render={ props => !isAuthenticated && !loading ? (
    //       <Navigate to='/login' />
    //     ) : (
    //       <Component { ...props } />
    //     )
    //   }
    // />

    loading === false && isAuthenticated ? <Outlet /> : <Navigate to='/login' />

  )
}

export default PrivateRoute