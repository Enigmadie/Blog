import React from 'react';

export default (props) => {
  const {field, form} = props;

  const handleChange = (e) => {
    const file  =  e.currentTarget.files[0];
    console.log(e.currentTarget.files)
    console.log(file)
    // console.log(e.currentTarget.files)
    const reader = new FileReader();
    const imgTag = document.getElementById("myimage");
    imgTag.title = file.name;
    reader.onload = (event) => {
      imgTag.src = event.target.result;
    };
    reader.readAsDataURL(file);
    // reader.append(file);
    form.setFieldValue(field.name, reader);
  };

  return (
    <div>
      <input type='file' onChange={(o) => handleChange(o)} />
      <img src='' alt='' id='myimage'/>
    </div>
  );
}

