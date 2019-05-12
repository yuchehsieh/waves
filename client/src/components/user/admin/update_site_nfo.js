import React, { Component } from 'react';

import { connect } from 'react-redux';

import FormField from '../../utils/form/formField';
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../../utils/form/formActions';

class UpdateSiteNfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false,
      formSuccess: false,
      formdata: {
        address: {
          element: 'input',
          value: '',
          config: {
            label: 'Address',
            name: 'address_input',
            type: 'text',
            placeholder: 'Enter the site address'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        hours: {
          element: 'input',
          value: '',
          config: {
            label: 'Working hours',
            name: 'hours_input',
            type: 'text',
            placeholder: 'Enter the site working hours'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        phone: {
          element: 'input',
          value: '',
          config: {
            label: 'Phone number',
            name: 'phone_input',
            type: 'text',
            placeholder: 'Enter the phone number'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        email: {
          element: 'input',
          value: '',
          config: {
            label: 'Shop email',
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
          validationMessage: '',
          showlabel: true
        }
      }
    };
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'site_info');
    this.setState({ formdata: newFormdata, formError: false });
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'site_info');
    let formIsValid = isFormValid(this.state.formdata, 'site_info');

    if (formIsValid) {
      console.log(dataToSubmit);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <h1>Site Info</h1>
          <FormField
            id="address"
            formdata={this.state.formdata.address}
            change={element => this.updateForm(element)}
          />
          <FormField
            id="hours"
            formdata={this.state.formdata.hours}
            change={element => this.updateForm(element)}
          />
          <FormField
            id="phone"
            formdata={this.state.formdata.phone}
            change={element => this.updateForm(element)}
          />
          <FormField
            id="email"
            formdata={this.state.formdata.email}
            change={element => this.updateForm(element)}
          />
          <div>
            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data.</div>
            ) : null}
            <button onClick={this.submitForm}>Upodate</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    Site: state.Site
  };
};

export default connect(mapStateToProps)(UpdateSiteNfo);
