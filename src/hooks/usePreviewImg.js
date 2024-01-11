import { useState } from 'react';
import useShowToast from './useShowToast';

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxImgSize = 2 * 1024 * 1024; // not more than 2MB

  const handleImg = (e) => {
    const file = e.target.files[0];

    if (file.size && file.type.startWith('image/')) {
    } else {
      showToast('Error', 'Please select an image file', 'error');
      setSelectedFile(null);
    }
  };
};

export default usePreviewImg;
