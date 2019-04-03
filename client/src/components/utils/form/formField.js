import React from 'react';

const FormField = ({ formdata, change, id }) => {
  const renderTemplate = () => {
    let formTemplate = null;
    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <div className="formBlock">
            <input
              value={formdata.value}
              {...formdata.config}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  const showError = () => {
    let errorMessage = null;

    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className="error_label">{formdata.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormField;
