import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { auth } from '../firebase/firebase';

const uselogin = () => {
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);
  return;
};

export default uselogin;
