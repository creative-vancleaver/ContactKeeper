import React, { useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

import AuthContext from './authContext';
import authReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types'

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: null,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

// LOAD USER

  const loadUser = async () => {

    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }
    setAuthToken(localStorage.token);

    try {

      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });

    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

// REGISTER USER

  const register = async formData => {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      try {

        const res = await axios.post('/api/users', formData, config);

        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });

        loadUser();

      } catch (err) {

        console.log(err.response.data.msg);

        dispatch({
          type: REGISTER_FAIL,
          payload: err.response.data.msg
        });

      }

  }

// LOGIN USER

  const login = async formData => {

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {

      const res = await axios.post('/api/auth', formData, config);
      
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();

    } catch (error) {
      console.log('errror ', error)

      dispatch({
        type: LOGIN_FAIL, 
        payload: error.response.data.msg
      });

    }
  }

// LOGOUT

  const logout = () => dispatch({ type: LOGOUT });

// CLEAR ERRORS

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (

    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearErrors,
        loadUser,
        login,
        logout
      }}
    >
      { props.children }
    </AuthContext.Provider>

  )

}

export default AuthState;