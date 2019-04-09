import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

  defaultLink = (item, i) => (
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
      return this.defaultLink(item, i);
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

export default connect(
  mapStateToProps,
  null
)(Header);
