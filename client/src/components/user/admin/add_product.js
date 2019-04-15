import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBrands, getWoods } from '../../../store/actions';

import UserLayout from '../../../hoc/userLayout';

import FormField from '../../utils/form/formField';
import {
  update,
  generateData,
  isFormValid
} from '../../utils/form/formActions';

class AddProduct extends Component {
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
            label: 'Product name',
            name: 'name_input',
            type: 'text',
            placeholder: 'Enter your name'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        description: {
          element: 'textarea',
          value: '',
          config: {
            label: 'Product description',
            name: 'description_input',
            type: 'text',
            placeholder: 'Enter your description'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        price: {
          element: 'input',
          value: '',
          config: {
            label: 'Product price',
            name: 'price_input',
            type: 'number',
            placeholder: 'Enter your price'
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        brand: {
          element: 'select',
          value: '',
          config: {
            label: 'Product Brand',
            name: 'brand_input',
            options: []
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        wood: {
          element: 'select',
          value: '',
          config: {
            label: 'Wood material',
            name: 'wood_input',
            options: []
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        frets: {
          element: 'select',
          value: '',
          config: {
            label: 'Frets',
            name: 'frets_input',
            options: [
              { key: 20, value: 20 },
              { key: 21, value: 21 },
              { key: 22, value: 22 },
              { key: 24, value: 24 }
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        shipping: {
          element: 'select',
          value: '',
          config: {
            label: 'Shipping',
            name: 'shipping_input',
            options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        available: {
          element: 'select',
          value: '',
          config: {
            label: 'Available, in stock',
            name: 'available_input',
            options: [{ key: true, value: 'Yes' }, { key: false, value: 'No' }]
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        },
        publish: {
          element: 'select',
          value: '',
          config: {
            label: 'Publish',
            name: 'publish_input',
            options: [
              { key: true, value: 'Public' },
              { key: false, value: 'Hidden' }
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: '',
          showlabel: true
        }
      }
    };
  }

  render() {
    const {
      formdata: {
        name,
        brand,
        wood,
        frets,
        available,
        price,
        publish,
        description,
        shipping
      }
    } = this.state;

    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>
          <form onSubmit={event => this.submitForm(event)}>
            {/* IMAGE on the top */}

            <FormField
              id="name"
              formdata={name}
              change={element => this.updateForm(element)}
            />
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    Product: state.Product
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ getBrands, getWoods }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
