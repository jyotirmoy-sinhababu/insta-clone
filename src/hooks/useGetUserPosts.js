import { useState, useEffect } from 'react';
import useShowToast from './useShowToast';
import { useSelector, useDispatch } from 'react-redux';
import { setPost } from '../slice/PostSlice';

import { firestore } from '../firebase/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userPosts = useSelector((state) => state.post.posts);
  const userProfile = useSelector((state) => state.profile.userProfile);
  const showToast = useShowToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPost = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      dispatch(setPost([]));
      try {
        const q = query(
          collection(firestore, 'posts'),
          where('createdBy', '==', userProfile.uid)
        );
        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        posts.sort((a, b) => b.createdAt - a.createdAt);
        dispatch(setPost(posts));
      } catch (error) {
        showToast('Error', error.message, 'error');
        dispatch(setPost([]));
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, [setPost, userProfile, showToast]);
  return { isLoading, posts };
};

export default useGetUserPosts;
