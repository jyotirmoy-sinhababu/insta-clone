import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../slice/PostSlice';
import { userPresent } from '../slice/UserProfileSlice';
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

const useGetFeedPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const posts = useSelector((state) => state.post.posts);
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (authUser.following.length === 0) {
        setIsLoading(false);
        dispatch(setPost([]));
        return;
      }
      const q = query(
        collection(firestore, 'posts'),
        where('createdBy', 'in', authUser.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];
        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });
        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        dispatch(setPost(feedPosts));
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getFeedPosts();
  }, [authUser, showToast, setPost, userPresent]);
  return { isLoading, posts };
};

export default useGetFeedPost;
