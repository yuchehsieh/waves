import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBrands, addBrand } from '../../../store/actions';

import FormField from '../../utils/form/formField';
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from '../../utils/form/formActions';

class ManageBrands extends Component {
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
            placeholder: 'Enter the brand'
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

  async componentDidMount() {
    await this.props.getBrands();
  }

  showCategoryItems = () =>
    this.props.Product.brands
      ? this.props.Product.brands.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, 'brands');
    this.setState({ formdata: newFormdata, formError: false });
  };

  submitForm = async event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'brands');
    let formIsValid = isFormValid(this.state.formdata, 'brands');

    if (formIsValid) {
      console.log(dataToSubmit);
      await this.props.addBrand(dataToSubmit, this.props.Product.brands);
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    const {
      formSuccess,
      formError,
      formdata: { name }
    } = this.state;
    return (
      <div className="admon_category_wrapper">
        <h1>Brands</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.showCategoryItems()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id="name"
                formdata={name}
                change={element => this.updateForm(element)}
              />
            </form>
            {formSuccess ? <div className="form_success">Success</div> : null}

            {formError ? (
              <div className="error_label">Please check your data.</div>
            ) : null}
            <button onClick={this.submitForm}>Add brand</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    Product: state.Product
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ getBrands, addBrand }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBrands);
