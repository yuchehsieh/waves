import React from 'react';

import Card from '../utils/card';
const CardBlockShop = ({ grid, products }) => {
  const renderCards = () =>
    products
      ? products.map(card => <Card key={card._id} {...card} grid={grid} />)
      : null;

  return (
    <div className="card_block_shop">
      <div>
        <div>
          {products ? (
            products.length === 0 ? (
              <div className="no_result">Sorry, no results</div>
            ) : null
          ) : null}
        </div>
        {renderCards()}
      </div>
    </div>
  );
};

export default CardBlockShop;
