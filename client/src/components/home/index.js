import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductsByArrival, getProductsBySell } from '../../store/actions';

import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';

class Home extends Component {
  async componentDidMount() {
    this.props.getProductsBySell();
    this.props.getProductsByArrival();
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <HomePromotion />
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
  return bindActionCreators(
    { getProductsByArrival, getProductsBySell },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
