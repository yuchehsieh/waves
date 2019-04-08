import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { auth } from '../store/actions';

export default (ComposedClass, reload, adminRoute = null) => {
  class AuthenticationCheck extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true
      };
    }

    async componentDidMount() {
      await this.props.auth();
      const user = this.props.User.userData;
      console.log(user);
      if (!user.isAuth) {
        if (reload) {
          this.props.history.push('/register_login');
        }
      } else {
        if (adminRoute && !user.isAdmin) {
          this.props.history.push('/user/dashboard');
        } else {
          if (reload === false) {
            this.props.history.push('/user/dashboard');
          }
        }
      }
      this.setState({ loading: false });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
          </div>
        );
      }

      return (
        <div>
          <ComposedClass {...this.props} user={this.props.User} />
        </div>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      User: state.User
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({ auth }, dispatch);
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticationCheck);
};
