import React from 'react';
import HomeLink from './HomeLink';
import ProfileLink from './ProfileLink';
import NotifictionIcon from './NotifictionIcon';

const SidebarItems = () => {
  return (
    <>
      <HomeLink />
      <NotifictionIcon />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
