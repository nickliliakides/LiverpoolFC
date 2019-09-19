import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formField';
import { validate } from '../../ui/misc';
import { fdb } from '../../../firebase';

const EditTable = props => {
  const [state, setState] = useState({
    teamId: '',
    name: '',
    formError: false,
    formSuccess: '',
    formdata: {
      w: {
        element: 'input',
        value: '',
        config: {
          name: 'w',
          type: 'number',
          label: 'Wins',
          min: '0'
        },
        validation: {
          number: true
        },
        valid: true,
        validationMessage: '',
        showLabel: false
      },
      d: {
        element: 'input',
        value: '',
        config: {
          name: 'd',
          type: 'number',
          label: 'Draws',
          min: '0'
        },
        validation: {
          number: true
        },
        valid: true,
        validationMessage: '',
        showLabel: false
      },
      l: {
        element: 'input',
        value: '',
        config: {
          name: 'l',
          type: 'number',
          label: 'Loses',
          min: '0'
        },
        validation: {
          number: true
        },
        valid: true,
        validationMessage: '',
        showLabel: false
      }
    }
  });

  useEffect(() => {
    const teamId = props.match.params.id;
    fdb
      .ref(`positions/${teamId}`)
      .once('value')
      .then(snapshot => {
        const team = snapshot.val();
        const name = team.team;

        const newFormdata = { ...state.formdata };

        newFormdata['w'].value = team.w;
        newFormdata['d'].value = team.d;
        newFormdata['l'].value = team.l;

        setState({
          ...state,
          teamId,
          name,
          formdata: newFormdata
        });
      });
  }, []);

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


  const successForm = message => {
    setState({ ...state, formSuccess: message });

    setTimeout(() => {
      setState({ ...state, formSuccess: '' });
    }, 1200);

    setTimeout(() => {
      props.history.push('/admin_table');
    }, 1200);
  };

  const submitForm = e => {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in state.formdata) {
      dataToSubmit[key] = parseInt(state.formdata[key].value);
      formIsValid = state.formdata[key].valid && formIsValid;
    }
    dataToSubmit.pts = dataToSubmit.w * 3 + dataToSubmit.d;
    dataToSubmit.p = dataToSubmit.w  + dataToSubmit.d + dataToSubmit.l;

    if (formIsValid) {
        fdb
          .ref(`positions/${state.teamId}`)
          .update(dataToSubmit)
          .then(() => {
            successForm('Updated successfully');
          })
          .catch(() => {
            setState({ formError: true });
          });
    } else {
      setState({ ...state, formError: true });
    }
    
  };

  console.log(state);

  return (
    <AdminLayout>
      <div className="team-edit">
      <div className="team-edit-wrapper">
        <div className="team-name-icon">
          <h2>{state.name}</h2>
          <div
            className="icon"
            style={{
              background: `url(/images/team_icons/${state.name
                .toLowerCase()
                .replace(' ', '.')}.png)`
            }}
          />
        </div>
        <div className="team-edit-left">
          <div className="team-edit-item">
            <label className="team-edit-item-l">&nbsp;&nbsp;Wins:</label>
            <FormField
              id={'w'}
              formdata={state.formdata.w}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />
          </div>

          <div className="team-edit-item">
            <label className="team-edit-item-l">Draws:</label>
            <FormField
              id={'d'}
              formdata={state.formdata.d}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />
          </div>

          <div className="team-edit-item">
            <label className="team-edit-item-l">Loses:</label>
            <FormField
              id={'l'}
              formdata={state.formdata.l}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />
          </div>
          <div className="success_label">{state.formSuccess}</div>
            {state.formError && (
              <div className="error_label">
                Something is wrong. Numbers cannot be negative!
              </div>
            )}
          <div className="admin_submit">
            <button className="btn" onClick={e => submitForm(e)}>Save</button>
          </div>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};

export default EditTable;
