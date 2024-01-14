import { useState, useEffect } from 'react';

import useShowToast from './useShowToast';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

import { useDispatch, useSelector } from 'react-redux';
import { userPresent, userAbsent } from '../slice/UserProfileSlice';

const useGetUserProfileByUsername = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);

      try {
        const q = query(
          collection(firestore, 'users'),
          where('userName', '==', username)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          return dispatch(userAbsent());
        }

        let userDoc;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
        dispatch(userPresent(userDoc));
      } catch (error) {
        showToast('Error', error.message, 'error');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [username]);
  return { isLoading };
};

export default useGetUserProfileByUsername;
