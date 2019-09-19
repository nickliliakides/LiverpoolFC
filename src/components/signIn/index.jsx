import React, { useState, useEffect } from 'react';
import FormField from '../ui/formField';
import { validate } from '../ui/misc';
import { firebase } from '../../firebase';

const SignIn = props => {
  const [state, setState] = useState({
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ''
      }
    }
  });

  useEffect(() => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }, [])

  const submitForm = e => {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in state.formdata) {
      dataToSubmit[key] = state.formdata[key].value;
      formIsValid = state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
        .then(() => {
          props.history.push('/dashboard');
        })
        .catch(err => {
          setState({ ...state, formError: true });
        });
    } else {
      setState({ ...state, formError: true });
    }
  };

  const updateForm = element => {
    const newFormdata = { ...state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.value = element.e.target.value;

    let validData = validate(newElement);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];

    newFormdata[element.id] = newElement;

    setState({
      ...state,
      formError: false,
      formdata: newFormdata
    });
  };

  const clearError = element => {
    const newFormdata = { ...state.formdata };
    const newElement = { ...newFormdata[element.id] };

    newElement.validationMessage = '';
    newFormdata[element.id] = newElement;

    setState({
      ...state,
      formError: false,
      formdata: newFormdata
    });
  };

  return (
    <div className="signin_container">
      <div className="signin_wrapper" style={{ magin: '100px' }}>
        <form onSubmit={e => submitForm(e)}>
          <h2>Please Login</h2>
          <h3>To get admin rights</h3>
          <FormField
            id={'email'}
            formdata={state.formdata.email}
            onchange={element => updateForm(element)}
            onblur={element => clearError(element)}
          />
          <FormField
            id={'password'}
            formdata={state.formdata.password}
            onchange={element => updateForm(element)}
            onblur={element => clearError(element)}
          />
          {state.formError ? (
            <div className="error_label">User is not authenticated.</div>
          ) : null}
          <button onClick={e => submitForm(e)}>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
