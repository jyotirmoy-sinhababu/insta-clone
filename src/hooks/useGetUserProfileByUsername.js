import { useState, useEffect } from 'react';

import useShowToast from './useShowToast';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

import { useDispatch, useSelector } from 'react-redux';
import { headerData } from '../slice/UserProfileSlice';

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const dispatch = useDispatch();
  const profileName = useSelector(
    (state) => state.userProfileReducer.userProfile
  );

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, 'users'),
          where('username', '==', username)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          return dispatch(headerData(null));
        }

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
        dispatch(headerData(userDoc));
      } catch (error) {
        showToast('Error', error.message, 'error');
      }
    };
    getUserProfile();
  }, []);
  return { isLoading, profileName };
};

export default useGetUserProfileByUsername;
