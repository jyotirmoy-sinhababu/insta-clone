import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/Firebase';
import useShowToast from './useShowToast';

import { useDispatch } from 'react-redux';
import { logout } from '../slice/AuthstateSlice';

const useLogout = () => {
  const [signOut, isLoggingOut, error] = useSignOut(auth);
  const showToast = useShowToast();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem('user-info');
      dispatch(logout());
      console.log('logged out');
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };
  return { handleLogout, isLoggingOut, error };
};

export default useLogout;
