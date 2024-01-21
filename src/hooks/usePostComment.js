import { useState } from 'react';
import useShowToast from './useShowToast';

import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../slice/PostSlice';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleComment = async (postId, comment) => {
    console.log(postId);
    console.log(comment);

    if (isCommenting) return;
    if (!authUser) showToast('Error', 'you are not logged in', 'error');
    setIsCommenting(true);

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId,
    };
    const newPostComment = {
      comment: newComment,
      postId: postId,
    };

    try {
      await updateDoc(doc(firestore, 'posts', postId), {
        comments: arrayUnion(newComment),
      });

      dispatch(addComment(newPostComment));
    } catch (error) {
      showToast('Error', error.message, 'error');
      console.log(error);
    } finally {
      setIsCommenting(false);
    }
  };
  {
    return { isCommenting, handleComment };
  }
};

export default usePostComment;
