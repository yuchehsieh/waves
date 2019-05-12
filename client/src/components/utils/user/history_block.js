import React from 'react';

import moment from 'moment';

const UserHistoryBlock = props => {
  const renderBlocks = () =>
    props.product
      ? props.product.map((item, i) => (
          <tr key={i}>
            <td>{moment(item.dateOfPurchase).format('MM-DD-YYYY')}</td>
            <td>
              {item.brand} {item.name}
            </td>
            <td>$ {item.price}</td>
            <td>{item.quantity}</td>
          </tr>
        ))
      : null;

  return (
    <div className="history_block">
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
};

export default UserHistoryBlock;
