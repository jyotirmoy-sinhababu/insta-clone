import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../slice/AuthstateSlice';
import { userPresent } from '../slice/UserProfileSlice';

const useFollowUser = () => {
  const [isUpdating, setIsUpdating] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.profile.userProfile);

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);
};

export default useFollowUser;
