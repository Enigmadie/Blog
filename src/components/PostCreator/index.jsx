import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import * as actions from '../../actions';
import FileUpload from './FileUpload.jsx'

const mapStateToProps = state => {
  const { editedPost } = state;
  return { editedPost };
}
const actionCreators = {
  addPost: actions.addPost,
  editPost: actions.editPost,
};

class PostCreator extends React.Component {
  render() {
    const { editedPost } = this.props;
    const isEdited = editedPost !== '';
    return (
      <div className='admin-form'>
        <Formik
          initialValues={{
            id: isEdited ? editedPost._id : null,
            title: isEdited ? editedPost.title : '',
            content: isEdited ? editedPost.content : '',
            file: editedPost.image ? editedPost.image : null,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('Can\'t be blank'),
            content: Yup.string().required('Can\t be blank'),
          })}
          onSubmit={({ id, title, content, file }, { setSubmitting, resetForm }) => {
            const { addPost, editPost } = this.props;
            const formData = new FormData();
            formData.append('image', file);
            formData.append('title', title);
            formData.append('content', content);
            isEdited ? editPost(id, { formData }) : addPost({ formData });
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form >
              <label htmlFor='file'>File upload</label>
              <Field name='file' component={FileUpload}/>
              <label htmlFor='title'>Title:</label>
              <Field type='text' name='title' className={
                errors.title && touched.title
                  ? 'content-input error'
                  : 'content-input'
              }/>
              { errors.title && touched.title && (<div className='error-message'>{errors.title}</div>)}
              <label htmlFor='content'>Content:</label>
              <Field type='text' name='content' className={
                errors.content && touched.content
                  ? 'content-input error'
                  : 'content-input'
              }/>
              { errors.content && touched.content && (<div className='error-message'>{errors.content}</div>)}
              <button type='submit' disabled={isSubmitting}>Add</button>
            </Form>
          )}
        </Formik>
    </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(PostCreator);
