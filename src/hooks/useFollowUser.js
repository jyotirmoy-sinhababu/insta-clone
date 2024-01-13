import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../slice/AuthstateSlice';
import { userPresent } from '../slice/UserProfileSlice';
import { firestore } from '../firebase/Firebase';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.profile.userProfile);
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);
    try {
      const currentUserRef = doc(firestore, 'users', authUser.uid);
      const userToFollowOrUnfollowRef = doc(firestore, 'users', userId);

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      await updateDoc(userToFollowOrUnfollowRef, {
        followers: isFollowing
          ? arrayRemove(authUser.uid)
          : arrayUnion(authUser.uid),
      });
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);
};

export default useFollowUser;
