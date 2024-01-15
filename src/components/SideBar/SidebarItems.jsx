import React from 'react';
import HomeLink from './HomeLink';
import ProfileLink from './ProfileLink';
import NotifictionIcon from './NotifictionIcon';
import CreatePostLink from './CreatePostLink';
import SearchIcon from './SearchIcon';

const SidebarItems = () => {
  return (
    <>
      <HomeLink />
      <SearchIcon />
      <NotifictionIcon />
      <CreatePostLink />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
