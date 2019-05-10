import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getCartItems } from '../../store/actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/fontawesome-free-solid';
import UserLayout from '../../hoc/userLayout';
import UserProductBlock from '../utils/user/product_block';

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
    let cartItems = [];
    let user = this.props.User;
    let userCart = user.userData.cart;

    if (userCart) {
      if (userCart.length > 0) {
        userCart.forEach(item => {
          cartItems.push(item.id);
        });
      }

      const response = await this.props.dispatch(
        getCartItems(cartItems, userCart)
      );
    }
  }

  removeFromCart = () => {};

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My cart</h1>
          <div className="user_cart">
            <UserProductBlock
              products={this.props.User}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
          </div>
        </div>
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
