import React from 'react';

import UserLayout from '../../hoc/userLayout';
import MyButton from '../utils/button';

const UserDashboard = () => {
  return (
    <UserLayout>
      <div>
        <div className="user_nfo_panel">
          <h1>User information</h1>
          <span>name</span>
          <span>lastname</span>
          <span>email</span>
          <MyButton
            type="default"
            linkTo="/user/user_profile"
            title="Edit account info"
          />
        </div>

        <div className="user_nfo_panel">
          <h1>History purchases</h1>
          <div className="user_product_block_wrapper">history</div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
