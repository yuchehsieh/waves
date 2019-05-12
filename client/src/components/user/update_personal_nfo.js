import React, { Component } from 'react';

import { connect } from 'react-redux';
import { updateUserData, clearUpdateUser } from '../../store/actions';

import FormField from '../utils/form/formField';
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateFields
} from '../utils/form/formActions';

class UpdatePersonalNfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formSuccess: '',
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
        }
      }
    };
  }

  componentDidMount() {
    const newFormData = populateFields(
      this.state.formdata,
      this.props.User.userData
    );

    this.setState({ formdata: newFormData });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'update_user');
    this.setState({ formdata: newFormdata, formError: false });
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'update_user');
    let formIsValid = isFormValid(this.state.formdata, 'update_user');

    if (formIsValid) {
      await this.props.dispatch(updateUserData(dataToSubmit));
      if (this.props.User.updateUser.success) {
        this.setState(
          {
            formSuccess: true
          },
          () => {
            setTimeout(() => {
              this.props.dispatch(clearUpdateUser());
              this.setState({ formSuccess: false });
            }, 2000);
          }
        );
      }
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <h2>Personal infomation</h2>
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
          <div>
            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data.</div>
            ) : null}
            <button onClick={this.submitForm}>Upodate personal info</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    User: state.User
  };
};

export default connect(mapStateToProps)(UpdatePersonalNfo);
