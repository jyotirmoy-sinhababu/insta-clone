import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../slice/AuthstateSlice';
import { userPresent } from '../slice/UserProfileSlice';
import { firestore } from '../firebase/Firebase';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, updateDoc, doc } from 'firebase/firestore';

const useFollowUser = (userId) => {
  //state hooks
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  //redux related
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.profile.userProfile);
  //custom hook
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    debugger;
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

      if (isFollowing) {
        //unfollow logic
        dispatch(
          login({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );
        dispatch(
          userPresent({
            ...profileUser,
            followers: profileUser.followers.filter(
              (uid) => uid !== authUser.uid
            ),
          })
        );
        localStorage.setItem(
          'user-info',
          JSON.stringify({
            ...authUser,
            following: authUser.following.filter((uid) => uid !== userId),
          })
        );
        setIsFollowing(false);
      } else {
        dispatch(
          login({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );

        dispatch(
          userPresent({
            ...profileUser,
            followers: [...profileUser.followers, authUser.uid],
          })
        );

        localStorage.setItem(
          'user-info',
          JSON.stringify({
            ...authUser,
            following: [...authUser.following, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser && authUser.following) {
      const isFollowing = authUser.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [authUser, userId]);
  return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
