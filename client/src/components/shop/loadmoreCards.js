import React from 'react';

import CardBlockShop from '../utils/card_block_shop';

const LoadmoreCards = ({ grid, limit, size, products, loadMore }) => {
  return (
    <div>
      <div>
        <CardBlockShop grid={grid} products={products} />
      </div>
    </div>
  );
};

export default LoadmoreCards;
