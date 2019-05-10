import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getCartItems } from '../../store/actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/fontawesome-free-solid';
import UserLayout from '../../hoc/userLayout';

class UserCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      total: 0,
      showTotal: false,
      showSuccess: false
    };
  }

  async componentDidMount() {
    let cartItem = [];
    let user = this.props.User;
    let userCart = user.userData.cart;

    if (userCart) {
      if (userCart.length > 0) {
        userCart.forEach(item => {
          cartItem.push(item.id);
        });
      }

      const response = await this.props.dispatch(
        getCartItems(cartItem, userCart)
      );
    }
  }

  render() {
    return (
      <UserLayout>
        <div>cart</div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    User: state.User
  };
};

export default connect(mapStateToProps)(UserCart);
