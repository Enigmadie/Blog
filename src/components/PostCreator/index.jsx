import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as actions from '../../actions';
import FileUpload from './FileUpload.jsx'

const actionCreators = {
  addPost: actions.addPost,
};

class PostCreator extends React.Component {
  render() {
    return (
      <div className='admin-form'>
        <Formik
          initialValues={{
            title: '',
            content: '',
            file: '',
          }}
          onSubmit={({ title, content, file }, { setSubmitting, resetForm }) => {
            const { addPost } = this.props;
            const formData = new FormData();
            formData.append('image', file);
            formData.append('title', title);
            formData.append('content', content);
            addPost({
              formData
            });
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form >
              <label>File upload</label>
              <Field name='file' component={FileUpload}/>
              <label>Topic:</label>
              <Field type='text' name='title' />
              <label>Content:</label>
              <Field type='text' name='content' />
              <button type='submit' disabled={isSubmitting}>Add</button>
            </Form>
          )}
        </Formik>
    </div>
    );
  }
}

export default connect(null, actionCreators)(PostCreator);
