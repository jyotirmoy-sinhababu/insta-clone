import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { login } from '../slice/AuthstateSlice';
import { userPresent } from '../slice/UserProfileSlice';

import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from '../firebase/Firebase';
import { doc, updateDoc } from 'firebase/firestore';

import useShowToast from './useShowToast';

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const showToast = useShowToast();
  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, 'users', authUser.uid);

    let URL = '';
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, 'data_url');
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        userName: inputs.userName || authUser.userName,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem('user-info', JSON.stringify(updatedUser));
      dispatch(login(updatedUser));
      dispatch(userPresent(updatedUser));

      showToast('Success', 'Profile updated successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.log(error);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
