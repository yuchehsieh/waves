import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';

import MyButton from '../utils/button';

const ProdNfo = props => {
  const detail = props.detail;

  const showProdTags = detail => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon={faTruck} />
          </div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>And return</div>
          </div>
        </div>
      ) : null}
      <div className="tag">
        <div>
          <FontAwesomeIcon icon={detail.available ? faCheck : faTimes} />
        </div>
        <div className="tag_text">
          {detail.available ? (
            <div>
              <div>Available</div>
              <div>in store</div>
            </div>
          ) : (
            <div>
              <div>Not Available</div>
              <div>Preorder only</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const showProdAction = detail => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            ///
            console.log('add to cart');
          }}
        />
      </div>
    </div>
  );

  const showProdSpecifications = detail => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div>
        <div className="item">
          <strong>Frets:</strong> {detail.frets}
        </div>
        <div className="item">
          <strong>Wood:</strong> {detail.wood.name}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1>
        {detail.brand.name} {detail.name}
      </h1>
      <p>{detail.description}</p>
      {showProdTags(detail)}
      {showProdAction(detail)}
      {showProdSpecifications(detail)}
    </div>
  );
};

export default ProdNfo;
