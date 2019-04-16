import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getBrands,
  getWoods,
  addProduct,
  clearProduct
} from '../../../store/actions';

import UserLayout from '../../../hoc/userLayout';

import FileUpload from '../../utils/form/fileupload';
import FormField from '../../utils/form/formField';
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields
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
        },
        images: {
          value: [],
          validation: {
            required: false
          },
          valid: true,
          touched: false,
          showlabel: false
        }
      }
    };
  }

  async componentDidMount() {
    const formdata = this.state.formdata;

    const promise = [this.props.getBrands(), this.props.getWoods()];
    const response = await Promise.all(promise);

    let newFormdata = populateOptionFields(
      formdata,
      response[0].payload,
      'brand'
    );
    newFormdata = populateOptionFields(
      newFormdata,
      response[1].payload,
      'wood'
    );

    this.setState({ formdata: newFormdata });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'products');
    this.setState({ formdata: newFormdata, formError: false });
  };

  resetFieldsHandler = () => {
    const newFormdata = resetFields(this.state.formdata, 'products');
    this.setState({ formdara: newFormdata, formSuccess: true });
    setTimeout(() => {
      this.setState({ formSuccess: false }, () => {
        this.props.clearProduct();
      });
    }, 3000);
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');

    if (formIsValid) {
      const response = await this.props.addProduct(dataToSubmit);
      if (response.payload.success) {
        this.resetFieldsHandler();
      } else {
        this.setState({ formError: true });
      }
    } else {
      this.setState({ formError: true });
    }
  };

  imagesHandler = () => {};

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
      },
      formError,
      formSuccess
    } = this.state;

    return (
      <UserLayout>
        <div>
          <h1>Add product</h1>
          <form onSubmit={event => this.submitForm(event)}>
            {/* IMAGE on the top */}

            <FileUpload
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />

            <FormField
              id="name"
              formdata={name}
              change={element => this.updateForm(element)}
            />
            <FormField
              id="description"
              formdata={description}
              change={element => this.updateForm(element)}
            />

            <FormField
              id="price"
              formdata={price}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id="brand"
              formdata={brand}
              change={element => this.updateForm(element)}
            />

            <FormField
              id="shipping"
              formdata={shipping}
              change={element => this.updateForm(element)}
            />

            <FormField
              id="available"
              formdata={available}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id="wood"
              formdata={wood}
              change={element => this.updateForm(element)}
            />

            <FormField
              id="frets"
              formdata={frets}
              change={element => this.updateForm(element)}
            />

            <div className="form_devider" />

            <FormField
              id="publish"
              formdata={publish}
              change={element => this.updateForm(element)}
            />

            {formSuccess ? <div className="form_success">Success</div> : null}

            {formError ? (
              <div className="error_label">Please check your data.</div>
            ) : null}
            <button onClick={this.submitForm}>Add product</button>
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
  return bindActionCreators(
    { getBrands, getWoods, addProduct, clearProduct },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddProduct);
