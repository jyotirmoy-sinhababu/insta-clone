import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/Firebase';
import { useState } from 'react';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';

import useShowToast from './useShowToast';

import { useDispatch } from 'react-redux';
import { login } from '../slice/AuthstateSlice';

const useSignUpWithEmailAndPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const showToast = useShowToast();

  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const signUp = async (inputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.userName ||
      !inputs.fullName
    ) {
      showToast('Error', 'Please all the fields', 'error');
      return;
    }

    const usersRef = collection(firestore, 'users');

    const q = query(usersRef, where('username', '==', inputs.userName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showToast('Error', 'Username already exists', 'error');
      return;
    }

    try {
      setIsLoading(true);
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        showToast('Error', error.message, 'error');
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          userName: inputs.userName,
          fullName: inputs.fullName,
          bio: '',
          profilePicUrl: '',
          followers: '',
          following: '',
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
        setIsLoading(false);
        localStorage.setItem('user-info', JSON.stringify(userDoc));
        dispatch(login(userDoc));
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
      setIsLoading(false);
      console.log(error);
    }
  };

  return { loading, error, signUp, isLoading };
};

export default useSignUpWithEmailAndPassword;
