import React from 'react';
import SuggestedUser from './SuggestedUser';
import SuggestedHeader from './SuggestedHeader';

const SuggestedUsers = () => {
  return (
    <div>
      <div>
        <SuggestedHeader />
      </div>
      <div>
        {' '}
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
      </div>
    </div>
  );
};

export default SuggestedUsers;
