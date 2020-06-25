import React, { ReactElement, useState } from 'react';
import { Post } from 'interfaces';
import { FormikProps } from 'formik';
import cn from 'classnames';

interface Props {
  prop: FormikProps<Post>;
}

export default ({ prop }: Props): ReactElement => {
  const [uploadingState, setUploadingState] = useState(false);
  const initialValue = prop.initialValues.image;
  const imgSrc = String(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      const imgTag = document.getElementById('myimage');
      if (imgTag !== null) {
        imgTag.title = file.name;
        setUploadingState(true);
      }
      reader.readAsDataURL(file);
      prop.setFieldValue('image', file);
    }
  };

  const uploadingWrapperCn = cn({
    'post-file-uploaded': uploadingState,
  });

  return (
    <>
      <label className="custom-file-uploader" htmlFor="post-input-file">
        <div className={uploadingWrapperCn}>
          <img alt="upload file" src="https://img.icons8.com/small/16/000000/box.png" />
          <input id="post-input-file" name="image" type="file" onChange={handleChange} />
          <span>Upload image</span>
        </div>
      </label>
      <img src={initialValue !== '' ? imgSrc : ''} alt="" id="myimage" />
    </>
  );
};
