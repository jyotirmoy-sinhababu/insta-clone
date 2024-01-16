import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useShowToast from './useShowToast';

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUser, setSuggestedUser] = useState([]);
  const authUser = useSelector((state) => state.auth.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, 'users');
        const q = query(
          usersRef,
          where('uid', 'not-in', [authUser.uid, ...authUser.following]),
          orderBy('uid'),
          limit(3)
        );

        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setSuggestedUser(users);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getSuggestedUsers();
  }, [authUser, showToast]);

  return { isLoading, suggestedUser };
};

export default useGetSuggestedUsers;
