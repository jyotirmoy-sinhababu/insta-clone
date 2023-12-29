import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/Firebase';

import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

import useShowToast from './useShowToast';

import { useDispatch } from 'react-redux';

const useSignUpWithEmailAndPassword = () => {
  const dispatch = useDispatch();

  const showToast = useShowToast;

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
    try {
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
        localStorage.setItem('user-info', JSON.stringify(userDoc));
        dispatch(userDoc);
      }
    } catch (err) {
      showToast('Error', error.message, 'error');
    }
  };

  return { loading, error, signUp };
};

export default useSignUpWithEmailAndPassword;
