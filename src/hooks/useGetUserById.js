import { useState, useEffect } from 'react';
import useShowToast from './useShowToast';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

const useGetUserById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);
      try {
        const userRef = await getDoc(doc(firestore, 'users', userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    getUserProfile();
  }, [showToast, setUserProfile, showToast]);
  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserById;
