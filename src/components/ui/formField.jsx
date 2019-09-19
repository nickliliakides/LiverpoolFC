import React from 'react';

const FormField = ({ id, formdata, onchange, onblur }) => {
  const showError = () => {
    let errorMessage = (
      <div className="error_label">
        {formdata.validation && !formdata.valid && formdata.validationMessage}
      </div>
    );
    return errorMessage;
  };

  const displayFieldLabel = () =>
    formdata.showLabel ? (
      <div className="label_inputs">{formdata.config.label}</div>
    ) : null;

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <div>
            {displayFieldLabel()}
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={e => onchange({ e, id })}
              onBlur={e => onblur({ e, id })}
            />
            {showError()}         
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div>
            {displayFieldLabel()}
            <select value={formdata.value} onChange={e => onchange({ e, id })}>
              <option value="select">Select one</option>
              {formdata.config.options.map((item, i) => (
                <option key={i} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };

  return <div>{renderTemplate()}</div>;
};


export default FormField;
