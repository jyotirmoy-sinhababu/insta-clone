import { useState } from 'react';
import { useSelector } from 'react-redux';
import useShowToast from './useShowToast';

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useSelector((state) => state.auth.user);
  const showToast = useShowToast();
};

export default useEditProfile;
