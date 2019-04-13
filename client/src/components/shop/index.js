import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBrands, getWoods } from '../../store/actions';

import PageTop from '../utils/page_top';
import CollapseCheckbox from '../utils/collapse_checkbox';

class Shop extends Component {
  async componentDidMount() {
    const promise = [this.props.getBrands(), this.props.getWoods()];
    const data = await Promise.all(promise);
    console.log(data);
  }

  handleFilters = () => {};

  render() {
    const Product = this.props.Product;
    return (
      <div>
        <PageTop title="Browse Products" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={Product.brands}
                handleFilters={filter => this.handleFilters(filter, 'brand')}
              />
            </div>
            <div className="right">right</div>
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
  return bindActionCreators({ getBrands, getWoods }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
