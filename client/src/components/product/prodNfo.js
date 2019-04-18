import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';

import MyButton from '../utils/button';

const ProdNfo = props => {
  const detail = props.detail;
  //   console.log(props);
  return (
    <div>
      <h1>
        {detail.brand.name} {detail.name}
      </h1>
      <p>{detail.description}</p>
    </div>
  );
};

export default ProdNfo;
