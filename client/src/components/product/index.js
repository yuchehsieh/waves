import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductDetail, clearProductDetail } from '../../store/actions';

import PageTop from '../utils/page_top';
import ProdNfo from './prodNfo';

class ProductPage extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await this.props.getProductDetail(id);
  }

  render() {
    console.log(this.props.Product);
    return (
      <div>
        <PageTop title="Product Detail" />
        <div className="container">
          {this.props.Product.prodDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">images</div>

              <div className="right">
                <ProdNfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.Product.prodDetail}
                />
              </div>
            </div>
          ) : (
            <CircularProgress thickness={7} style={{ color: '#00bcd4' }} />
          )}
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
  return bindActionCreators({ getProductDetail, clearProductDetail }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
