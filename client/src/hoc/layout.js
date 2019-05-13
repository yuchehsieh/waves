import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getSiteData } from '../store/actions';

import Header from '../components/header_footer/header';
import Footer from '../components/header_footer/footer';

class Layout extends Component {
  async componentDidMount() {
    if (Object.keys(this.props.Site).length === 0) {
      await this.props.dispatch(getSiteData());
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer data={this.props.Site} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    Site: state.Site
  };
};

export default connect(mapStateToProps)(Layout);
