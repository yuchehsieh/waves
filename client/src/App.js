import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  async componentDidMount() {
    // let response = await axios.get('/api/products/brands')
    // console.log(response);

    axios.get('/api/products/brands').then(response => {
      console.log(response);
    });
  }

  render() {
    return <div>my app</div>;
  }
}

export default App;
