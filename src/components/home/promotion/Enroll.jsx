import React, { useState } from 'react';
import FormField from '../../ui/formField';
import { validate } from '../../ui/misc';
import Fade from 'react-reveal/Fade';
import { emails } from '../../../firebase';

const Enroll = () => {
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
      }
    }
  });

  const submitForm = e => {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in state.formdata) {
      dataToSubmit[key] = state.formdata[key].value;
      formIsValid = state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      emails
        .orderByChild('email')
        .equalTo(dataToSubmit.email)
        .once('value')
        .then(snapshot => {
          if (snapshot.val() === null) {
            emails.push(dataToSubmit);
            resetFormSuccess(true);
          } else {
            resetFormSuccess(false);
          }
        });
    } else {
      setState({...state, formError: true });
      setTimeout(() => {
        const newFormdata = { ...state.formdata };
        const newElement = { ...newFormdata['email'] };
    
        newElement.validationMessage = '';
        newFormdata['email'] = newElement;
    
        setState({
          ...state,
          formError: false,
          formdata: newFormdata
        });
      }, 3000);
    }
  };

  const resetFormSuccess = type => {
    const newFormdata = { ...state.formdata };

    for (let key in newFormdata) {
      newFormdata[key].value = '';
      newFormdata[key].valid = false;
      newFormdata[key].validationMessage = '';
    }

    setState({
      ...state,
      formError: false,
      formdata: newFormdata,
      formSuccess: type
        ? 'You have subscribed succesfully.'
        : 'Email is already in the database.'
    });
    clearSuccessMessage();
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

  const clearSuccessMessage = () => {
    setTimeout(() => {
      setState({...state, formSuccess: '' });
    }, 3000);
  };


  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={e => submitForm(e)}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <FormField
              id={'email'}
              formdata={state.formdata.email}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />
            {state.formError ? (
              <div className="error_label">
                Something is wrong, please try again.
              </div>
            ) : null}
            <div className="success_label">{state.formSuccess}</div>
            <button onClick={e => submitForm(e)}>Subscribe</button>
            <div className="enroll_discl">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas
              quo porro in tenetur eaque deserunt quam sequi non?
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;
