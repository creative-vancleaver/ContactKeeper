import React, { useReducer } from 'react';

import axios from 'axios';

// import { v4 as uuidv4 } from 'uuid';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import{
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  CONTACT_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = props => {
  
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

// ACTIONS WILL BE GOING HERE

  // ADD CONTACT

  const addContact = async contact => {
    // contact.id = uuidv4();

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {

      const res = await axios.post('/api/contacts', contact, config);

      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      });


    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg
      })
    }

    // dispatch({ type: ADD_CONTACT, payload: contact });
  }

  // GET CONTACTS

  const getContacts = async () => {

    try {

      const res = await axios.get('/api/contacts');
      console.log(res);
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });

    } catch (error) {

      dispatch({
        type: CONTACT_ERROR,
        error: error.response.data.msg
      });

    }
  }

  // UPDATE CONTACT

  const updateContact = async contact => {
    
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    
    try {

      const res = await axios.put(`/api/contacts/${ contact._id }`, contact, config);

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });

    } catch (err) {

      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });

    }

  }

  // DELETE CONTACT

  const deleteContact = async id => {

    try {

      await axios.delete(`/api/contacts/${ id }`);

      dispatch({ 
        type: DELETE_CONTACT, 
        payload: id 
      });

    } catch (err) {
      console.log('delete error ', err);

      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });

    }

  }

  // CLEAR CONTACTS

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS 
    });
  }

  // SET CURRENT CONTACT

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  }

  // CLEAR CURRENT CONTACT

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  }

  // FILTER CONTACTS

  const filterContacts = text => {
      dispatch({ type: FILTER_CONTACTS, payload: text });
  }

  // CLEAR FILTER

  const clearFilter = () => {
      dispatch({ type: CLEAR_FILTER });
  }

// RETURN <PROVIDER> -- TO WRAP ENTIRE 'APP' WITH CONTEXT

  return (

    <ContactContext.Provider
// VALUE === THINGS TO ACCESS IN OTHER COMPONENTS (IE STATE + ACTIONS)
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        getContacts,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      { props.children }
    </ContactContext.Provider>

  )

};

export default ContactState;