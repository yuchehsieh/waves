import React, { Component } from 'react';
import axios from 'axios';

import FormField from '../utils/form/formField';
import { update, generateData, isFormValid } from '../utils/form/formActions';

class ResetUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formSuccess: false,
      formdata: {
        email: {
          element: 'input',
          value: '',
          config: {
            name: 'email_input',
            type: 'email',
            placeholder: 'Enter your email'
          },
          validation: {
            required: true,
            email: true
          },
          valid: false,
          touched: false,
          validationMessage: ''
        }
      }
    };
  }
  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'reset_email');
    this.setState({ formdata: newFormdata, formError: false });
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'reset_email');
    let formIsValid = isFormValid(this.state.formdata, 'reset_email');

    if (formIsValid) {
      console.log(dataToSubmit);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Reset password</h1>
        <form onSubmit={this.submitForm}>
          <FormField
            id="email"
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />
          <div>
            {this.state.formSuccess ? (
              <div className="form_success">Done, check your email</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data.</div>
            ) : null}
            <button onClick={this.submitForm}>
              Send email to reset password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetUser;
