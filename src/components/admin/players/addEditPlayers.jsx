import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formField';
import { validate } from '../../ui/misc';
import { fdb, firebase, fdbPlayers } from '../../../firebase';
import Fileuploader from '../../ui/fileUploader';

const AddEditPlayers = props => {
  const [state, setState] = useState({
    playerId: '',
    formType: '',
    formError: false,
    formSuccess: '',
    defaultImg: '',
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          label: 'Player Name'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          label: 'Player Last Name'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      number: {
        element: 'input',
        value: '',
        config: {
          name: 'number_input',
          type: 'number',
          label: 'Player Number'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      position: {
        element: 'select',
        value: '',
        config: {
          name: 'select_position',
          type: 'select',
          label: 'Select Position',
          options: [
            { key: 'Goalkeeper', value: 'Goalkeeper' },
            { key: 'Defender', value: 'Defender' },
            { key: 'Midfielder', value: 'Midfielder' },
            { key: 'Attacker', value: 'Attacker' },
            { key: 'Manager', value: 'Manager' }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      nationality: {
        element: 'input',
        value: '',
        config: {
          name: 'nationality_input',
          type: 'text',
          label: 'Nationality'
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: '',
        showLabel: true
      },
      image: {
        element: 'image',
        value: '',
        validation: {
          required: true
        },
        valid: false
      }
    }
  });


  useEffect(() => {
    const playerId = props.match.params.id;
    if (!playerId) {
      setState({ ...state, formType: 'Add Player' });
    } else {
      fdb
        .ref(`players/${playerId}`)
        .once('value')
        .then(snapshot => {
          const player = snapshot.val();
          firebase
            .storage()
            .ref('players')
            .child(player.image)
            .getDownloadURL()
            .then(url => {
              updateFields(player, playerId, url);
            });
        });
    }
  }, []);

  const updateFields = (player, playerId, url) => {
    const newFormdata = { ...state.formdata };
    for (let key in newFormdata) {
      newFormdata[key].value = player[key];
      newFormdata[key].valid = true;
    }

    setState({
      ...state,
      playerId,
      defaultImg: url,
      formType: 'Edit Player',
      formdata: newFormdata
    });
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
      if (state.formType === 'Edit Player') {
        fdb
          .ref(`players/${state.playerId}`)
          .update(dataToSubmit)
          .then(() => {
            successForm('Updated successfully');
          })
          .catch(() => {
            setState({ ...state, formError: true });
          });
      } else {
        fdbPlayers
          .push(dataToSubmit)
          .then(() => {
            props.history.push('/admin_players');
          })
          .catch(() => {
            setState({ ...state, formError: true });
          });
      }
    } else {
      setState({ ...state, formError: true });
    }
  };

  const successForm = message => {
    setState({ ...state, formSuccess: message });

    setTimeout(() => {
      setState({ ...state, formSuccess: '' });
    }, 1200);

    setTimeout(() => {
      props.history.push('/admin_players');
    }, 1200);
  };


  const updateForm = (element, content = '') => {
    const newFormdata = { ...state.formdata };
    const newElement = { ...newFormdata[element.id] };

    if (content === '') {
      newElement.value = element.e.target.value;
    } else {
      newElement.value = content;
    }

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

  const resetImage = () => {
    const newFormdata = { ...state.formdata };
    newFormdata['image'].value = '';
    newFormdata['image'].valid = false;

    setState({
      ...state,
      defaultImg: '',
      formdata: newFormdata
    });
  };

  const storeFileneme = filename => {
    updateForm({ id: 'image' }, filename);
  };

  return (
    <AdminLayout>
      <div
        className="editplayers_dialog_wrapper"
        style={{ margin: '20px 0 0 120px' }}
      >
        <h2>{state.formType}</h2>
        <div>
          <form onSubmit={e => submitForm(e)}>
            <Fileuploader
              dir="players"
              tag="Player Image"
              defaultImg={state.defaultImg}
              defaultImgName={state.formdata.image.value}
              resetImage={() => resetImage()}
              filename={filename => storeFileneme(filename)}
            />
            <FormField
              id={'name'}
              formdata={state.formdata.name}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />
            <FormField
              id={'lastname'}
              formdata={state.formdata.lastname}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />
            <FormField
              id={'number'}
              formdata={state.formdata.number}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />
            <FormField
              id={'position'}
              formdata={state.formdata.position}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />
            <FormField
              id={'nationality'}
              formdata={state.formdata.nationality}
              onchange={element => updateForm(element)}
              onblur={element => clearError(element)}
            />

            <div className="success_label">{state.formSuccess}</div>
            {state.formError && (
              <div className="error_label">
                Something is wrong. Please check form fields!
              </div>
            )}
            <div className="admin_submit">
              <button className="btn" onClick={e => submitForm(e)}>Save</button>
              {/* {state.formType !== 'Add Player' && (
              <button className='delete' onClick={() => deletePlayer()}>Delete Player</button>
            )} */}
            </div>           
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;
