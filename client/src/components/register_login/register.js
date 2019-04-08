import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { registerUser } from '../../store/actions';

import FormField from '../utils/form/formField';
import { update, generateData, isFormValid } from '../utils/form/formActions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formSuccess: false,
      formdata: {
        name: {
          element: 'input',
          value: '',
          config: {
            name: 'name_input',
            type: 'text',
            placeholder: 'Enter your name'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: ''
        },
        lastname: {
          element: 'input',
          value: '',
          config: {
            name: 'lastname_input',
            type: 'text',
            placeholder: 'Enter your lastname'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: ''
        },
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
        },
        confirmPassword: {
          element: 'input',
          value: '',
          config: {
            name: 'confirm_password_input',
            type: 'password',
            placeholder: 'Confirm your password'
          },
          validation: {
            required: true,
            confirm: 'password'
          },
          valid: false,
          touched: false,
          validationMessage: ''
        }
      }
    };
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'register');
    this.setState({ formdata: newFormdata, formError: false });
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'register');
    let formIsValid = isFormValid(this.state.formdata, 'register');

    if (formIsValid) {
      try {
        const response = await this.props.registerUser(dataToSubmit);
        console.log(response);
        if (response.payload.success) {
          this.setState({
            formError: false,
            formSuccess: true
          });
          setTimeout(() => {
            this.props.history.push('/register_login');
          }, 3000);
        } else {
          this.setState({ formError: true });
        }
      } catch {
        this.setState({ formError: true });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={this.submitForm}>
                <h2>Personal information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id="name"
                      formdata={this.state.formdata.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id="lastname"
                      formdata={this.state.formdata.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <FormField
                    id="email"
                    formdata={this.state.formdata.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id="password"
                      formdata={this.state.formdata.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id="confirmPassword"
                      formdata={this.state.formdata.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  {this.state.formError ? (
                    <div className="error_label">Please check your data.</div>
                  ) : null}
                  <button onClick={this.submitForm}>Create an account</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>Congratulations !!</div>
            <div>You will be redirected to the login in couple seconds...</div>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ registerUser }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
