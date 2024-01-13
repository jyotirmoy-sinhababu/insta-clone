import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { auth, firestore } from '../firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import { login } from '../slice/AuthstateSlice';
import { useDispatch } from 'react-redux';

const uselogin = () => {
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const dispatch = useDispatch();

  const loginUser = async (inputs) => {
    if (!inputs.email || !inputs.password) {
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
        dispatch(login(docSnap.data()));
        console.log(doc);
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.log(error);
    }
  };

  return { loading, error, loginUser };
};

export default uselogin;
