import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { auth, firestore } from '../firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import { login } from '../slice/AuthstateSlice';
import { useDispatch } from 'react-redux';

const uselogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const loginUser = async (inputs) => {
    if (inputs.email || inputs.password) {
      return showToast('Error', 'Please fill all field', 'error');
    }
    try {
      const userCred = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (userCred) {
        const docRef = doc(firestore, 'users', userCred.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
        useDispatch(login(docSnap.data()));
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return;
};

export default uselogin;
