import React, { Component } from 'react';
import axios from 'axios';

import Header from '../components/header_footer/header';
import Footer from '../components/header_footer/footer';

class Layout extends Component {
  async componentDidMount() {
    console.log(await axios.get('/api/product/brands'));
  }

  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
