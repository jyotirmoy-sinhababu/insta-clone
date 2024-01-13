import { useState } from 'react';
import { useSelector } from 'react-redux';
import useShowToast from './useShowToast';

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const authUser = useSelector((state) => state.auth.user);
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
        username: inputs.username || authUser.username,
        bio: inputs.bio || authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem('user-info', JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast('Success', 'Profile updated successfully', 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
