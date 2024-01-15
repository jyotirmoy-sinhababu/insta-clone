import { useState } from 'react';
import { useShowToast } from './useShowToast';

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState();
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
      const q = query(
        collection(firestore, 'users'),
        where('username', '==', username)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast('Error', 'User not found', 'error');

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      showToast('Error', error.message, 'error');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;