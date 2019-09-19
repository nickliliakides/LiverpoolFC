import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formField';
import { validate, firebaseLooper } from '../../ui/misc';
import { teams, fdb, fdbMatches } from '../../../firebase';

const AddEditMatch = props => {
  const [state, setState] = useState({
    matchId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    teams: [],
    formdata: {
      date: {
        element: 'input',
        value: '',
        config: {
          name: 'date_input',
          type: 'date',
          label: 'Event date'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      time: {
        element: 'input',
        value: '',
        config: {
          name: 'time_input',
          type: 'time',
          label: 'Event time'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      local: {
        element: 'select',
        value: '',
        config: {
          name: 'select_home',
          type: 'select',
          label: 'Select home team',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      resultLocal: {
        element: 'input',
        value: '',
        config: {
          name: 'score_home',
          type: 'text',
          label: 'Home team score'
        },
        validation: {
          required: false
        },
        valid: true,
        validationMessage: '',
        showLabel: false
      },
      away: {
        element: 'select',
        value: '',
        config: {
          name: 'select_away',
          type: 'select',
          label: 'Select away team',
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: false
      },
      resultAway: {
        element: 'input',
        value: '',
        config: {
          name: 'score_away',
          type: 'text',
          label: 'Away team score'
        },
        validation: {
          required: false
        },
        valid: true,
        validationMessage: '',
        showLabel: false
      },
      stadium: {
        element: 'input',
        value: '',
        config: {
          name: 'stadium',
          type: 'text',
          label: 'Stadium'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      result: {
        element: 'select',
        value: '',
        config: {
          name: 'select_result',
          type: 'select',
          label: 'Team result',
          options: [
            { key: 'W', value: 'Win' },
            { key: 'L', value: 'Loss' },
            { key: 'D', value: 'Draw' },
            { key: 'n/a', value: 'n/a' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      final: {
        element: 'select',
        value: '',
        config: {
          name: 'select_final',
          type: 'select',
          label: 'Game played?',
          options: [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      }
    }
  });

  useEffect(() => {
    const matchId = props.match.params.id;
    const getTeams = (match, type) => {
      teams.once('value').then(snapshot => {
        const teamsArray = firebaseLooper(snapshot);
        const teamOptions = [];

        teamsArray.forEach(team => {
          teamOptions.push({
            key: team.shortname,
            value: team.shortName
          });
        });
        updateFields(match, teamOptions, teamsArray, type, matchId);
      });
    };

    if (!matchId) {
      getTeams(false, 'Add Match');
    } else {
      fdb
        .ref(`matches/${matchId}`)
        .once('value')
        .then(snapshot => {
          const match = snapshot.val();
          getTeams(match, 'Edit Match');
        });
    }
  }, []);

  const successForm = message => {
    setState({ ...state, formSuccess: message });

    setTimeout(() => {
      setState({ ...state, formSuccess: '' });
    }, 1200);

    setTimeout(() => {
      props.history.push('/admin_matches');
    }, 1200);
  };

  const submitForm = e => {
    e.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in state.formdata) {
      dataToSubmit[key] = state.formdata[key].value;
      formIsValid = state.formdata[key].valid && formIsValid;
    }

    if (formIsValid) {
      if (state.formType === 'Edit Match') {
        fdb
          .ref(`matches/${state.matchId}`)
          .update(dataToSubmit)
          .then(() => {
            successForm('Updated successfully');
          })
          .catch(() => {
            setState({ formError: true });
          });
      } else {
        fdbMatches
          .push(dataToSubmit)
          .then(() => {
            props.history.push('/admin_matches');
          })
          .catch(() => {
            setState({ formError: true });
          });
      }
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

  const updateFields = (match, teamOptions, teams, type, matchId) => {
    const newFormdata = { ...state.formdata };

    for (let key in newFormdata) {
      if (match) {
        newFormdata[key].value = match[key];
        newFormdata[key].valid = true;
      }
      if (key === 'local' || key === 'away') {
        newFormdata[key].config.options = teamOptions;
      }
    }

    setState({
      ...state,
      matchId,
      formType: type,
      formdata: newFormdata,
      teams
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
    <AdminLayout>
      <div
        className="editmatch_dialog_wrapper"
        style={{ margin: '20px 0 0 120px' }}
      >
        <h2>{state.formType}</h2>
        <div>
          <form onSubmit={e => submitForm(e)}>
            <FormField
              id={'date'}
              formdata={state.formdata.date}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />

            <FormField
              id={'time'}
              formdata={state.formdata.time}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />

            <div className="select_team_layout">
              <div className="label_inputs">Home Team</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={'local'}
                    formdata={state.formdata.local}
                    onchange={element => updateForm(element)}
                    onblur={element => clearError(element)}
                  />
                </div>
                <div>
                  <FormField
                    id={'resultLocal'}
                    formdata={state.formdata.resultLocal}
                    onchange={element => updateForm(element)}
                    onblur={element => clearError(element)}
                  />
                </div>
              </div>
              <div className="label_inputs">Away Team</div>
              <div className="wrapper">
                <div className="left">
                  <FormField
                    id={'away'}
                    formdata={state.formdata.away}
                    onchange={element => updateForm(element)}
                    onblur={element => clearError(element)}
                  />
                </div>
                <div>
                  <FormField
                    id={'resultAway'}
                    formdata={state.formdata.resultAway}
                    onchange={element => updateForm(element)}
                    onblur={element => clearError(element)}
                  />
                </div>
              </div>
            </div>

            <div className="split_fields">
              <FormField
                id={'stadium'}
                formdata={state.formdata.stadium}
                onchange={element => updateForm(element)}
                onblur={element => clearError(element)}
              />
            </div>

            <div className="split_fields last">
              <FormField
                id={'result'}
                formdata={state.formdata.result}
                onchange={element => updateForm(element)}
                onblur={element => clearError(element)}
              />

              <FormField
                id={'final'}
                formdata={state.formdata.final}
                onchange={element => updateForm(element)}
                onblur={element => clearError(element)}
              />
            </div>

            <div className="success_label">{state.formSuccess}</div>
            {state.formError && (
              <div className="error_label">
                Something is wrong. Please check form fields!
              </div>
            )}
            <div className="admin_submit">
              <button className="btn" onClick={e => submitForm(e)}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditMatch;
