import React from 'react';

export default (props) => {
  const { field, form } = props;
  const initialValue = form.initialValues.file;
  const imgSrc = `http://localhost:8080/${initialValue}`;

  const handleChange = (e) => {
    const reader = new FileReader();
    const file  =  e.currentTarget.files[0];
    const imgTag = document.getElementById("myimage");
    imgTag.title = file.name;
    reader.onload = (event) => {
      imgTag.src = event.target.result;
    };
    reader.readAsDataURL(file);
    form.setFieldValue(field.name, file);
  };

  return (
    <>
      <input type='file' onChange={(o) => handleChange(o)} />
      <img src={initialValue !== null ? imgSrc : ''} alt='' id='myimage'/>
    </>
  );
}

