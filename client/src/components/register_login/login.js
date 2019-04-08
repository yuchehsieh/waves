import React, { Component } from 'react';

import { connect } from 'react-redux';

import FormField from '../utils/form/formField';
import { update, generateData, isFormValid } from '../utils/form/formActions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formSuccess: '',
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
        },
        password: {
          element: 'input',
          value: '',
          config: {
            name: 'password_input',
            type: 'password',
            placeholder: 'Enter your password'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: ''
        }
      }
    };
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'login');
    this.setState({ formdata: newFormdata, formError: false });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login');

    if (formIsValid) {
      console.log(dataToSubmit, formIsValid);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id="email"
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />

          <FormField
            id="password"
            formdata={this.state.formdata.password}
            change={element => this.updateForm(element)}
          />

          {this.state.formError ? (
            <div className="error_label">Please check your data.</div>
          ) : null}

          <button onClick={this.submitForm}>Submit</button>
        </form>
      </div>
    );
  }
}

export default connect()(Login);
