import React from 'react';

export default ({ prop }) => {
  const initialValue = prop.initialValues.file;
  const imgSrc = `http://localhost:8080/${initialValue}`;

  const handleChange = (e) => {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    const imgTag = document.getElementById('myimage');
    imgTag.title = file.name;
    reader.onload = (event) => {
      imgTag.src = event.target.result;
    };
    reader.readAsDataURL(file);
    prop.setFieldValue('file', file);
  };

  return (
    <label htmlFor="file">
      File upload:
      <input name="file" type="file" onChange={(o) => handleChange(o)} />
      <img src={initialValue !== null ? imgSrc : ''} alt="" id="myimage" />
    </label>
  );
};
