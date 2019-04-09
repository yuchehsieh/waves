import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logoutUser } from '../../../store/actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: [
        {
          name: 'Home',
          linkTo: '/',
          public: true
        },
        {
          name: 'Guitars',
          linkTo: '/shop',
          public: true
        }
      ],
      user: [
        {
          name: 'My Cart',
          linkTo: '/user/cart',
          public: false
        },
        {
          name: 'My Account',
          linkTo: '/user/dashboard',
          public: false
        },
        {
          name: 'Log in',
          linkTo: '/register_login',
          public: true
        },
        {
          name: 'Log out',
          linkTo: '/user/logout',
          public: false
        }
      ]
    };
  }

  logoutHandler = async () => {
    const request = await this.props.logoutUser();

    if (request.payload.success) {
      this.props.history.push('/');
    }
  };

  cartLink = (item, i) => {
    const userData = this.props.User.userData;

    return (
      <div className="cart_link" key={i}>
        <span>{userData.cart ? userData.cart.length : 0}</span>
        <Link to={item.linkTo}>{item.name}</Link>
      </div>
    );
  };

  defaultLink = (item, i) =>
    item.name === 'Log out' ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  showLinks = type => {
    let list = [];
    const userData = this.props.User.userData;

    if (userData) {
      type.forEach(item => {
        if (!userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== 'Log in') {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };

  render() {
    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(this.state.user)}</div>
            <div className="bottom">{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    User: state.User
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ logoutUser }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
