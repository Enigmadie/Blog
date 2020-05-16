import React, { ReactElement } from 'react';
import { Post } from 'interfaces';
import { FormikProps } from 'formik';

declare const domain: string;

interface Props {
  prop: FormikProps<Post>;
}

export default ({ prop }: Props): ReactElement => {
  const initialValue = prop.initialValues.image;
  const imgSrc = `${domain}/assets${initialValue}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    if (e.currentTarget.files !== null) {
      const file = e.currentTarget.files[0];
      const imgTag = document.getElementById('myimage');
      if (imgTag !== null) {
        imgTag.title = file.name;
      }
      reader.readAsDataURL(file);
      prop.setFieldValue('file', file);
    }
  };

  return (
    <label htmlFor="image">
      Image upload:
      <input name="image" type="file" onChange={handleChange} />
      <img src={initialValue !== '' ? imgSrc : ''} alt="" id="myimage" />
    </label>
  );
};