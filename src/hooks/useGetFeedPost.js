import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../slice/PostSlice';
import { userPresent } from '../slice/UserProfileSlice';
import useShowToast from './useShowToast';

const useGetFeedPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const posts = useSelector((state) => state.post.posts);
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      try {
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
  }, []);
};

export default useGetFeedPost;
