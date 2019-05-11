import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCartItems, removeCartItem } from '../../store/actions';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/fontawesome-free-solid';
import UserLayout from '../../hoc/userLayout';
import UserProductBlock from '../utils/user/product_block';

import Paypal from '../utils/paypal';
// AcjMwBr23OAw6qpfpbl8qrTg0NWoOs3dJSNj46vZY4yI__JWeMvKIcHJ4aWuh16l-8FUalvZa2BimFM-

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

      // 這邊不能用 user alias
      await this.props.getCartItems(cartItems, userCart);
      if (this.props.User.cartDetail.length > 0) {
        this.calculateTotal(this.props.User.cartDetail);
      }
    }
  }

  calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.forEach(item => {
      total = total + parseInt(item.price, 10) * parseInt(item.quantity, 10);
    });

    this.setState({ total, showTotal: true });
  };

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>You have no items</div>
    </div>
  );

  removeFromCart = async id => {
    await this.props.removeCartItem(id);
    if (this.props.User.cartDetail.length <= 0) {
      this.setState({ showTotal: false });
    } else {
      this.calculateTotal(this.props.User.cartDetail);
    }
  };

  transactionError = data => {
    console.log('Paypal error');
  };

  transactionCanceled = () => {
    console.log('Transaction canceld');
  };

  transactionSuccess = data => {
    this.setState({
      showTotal: false,
      showSuccess: true
    });
  };

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

            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  <div>Total amount: $ {this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div className="cart_success">
                <FontAwesomeIcon icon={faSmile} />
                <div>THANK YOU</div>
                <div>YOUR ORDER IS NOW COMPLETE</div>
              </div>
            ) : (
              this.showNoItemMessage()
            )}
          </div>
          {this.state.showTotal ? (
            <div className="paypal_button_container">
              <Paypal
                toPay={this.state.total}
                transactionError={data => this.transactionError(data)}
                transactionCanceled={data => this.transactionCanceled(data)}
                onSuccess={data => this.transactionSuccess(data)}
              />
            </div>
          ) : null}
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ getCartItems, removeCartItem }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCart);
