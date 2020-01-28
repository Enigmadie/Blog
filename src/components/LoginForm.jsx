import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { isAdmin, adminAuthentificationState } = state;
  return { isAdmin, adminAuthentificationState };
}

const actionCreators = {
  authenticationAdmin: actions.authenticationAdmin,
};

class LoginForm extends React.Component {
  render() {
    return (
      <div className='admin-form'>
        <Formik 
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          login: Yup.string().required('Can\'t be blank'),
          password: Yup.string().required('Can\'t be blank'),
        })}
       onSubmit={({ login, password }, { setSubmitting, resetForm }) => {
         const { authenticationAdmin } = this.props;
         authenticationAdmin({ login, password });
         resetForm();
         setSubmitting(false);
       }}
        >
          {({ errors, touched, isSubmitting }) => (
          <Form>
            <label htmlFor='login'>Login:</label>
            <Field type='text' name='login' className={
              errors.login && touched.login
                ? 'content-input error'
                : 'content-input'
            }/>
            { errors.login && touched.login && (<div className='error-message'>{errors.login}</div>)}
            <label htmlFor='password'>Password:</label>
            <Field type='password' name='password' className={
              errors.password && touched.password
                ? 'content-input error'
                : 'content-input'
            }/>
            { errors.password && touched.password && (<div className='error-message'>{errors.password}</div>)}
            <button type='submit' disabled={isSubmitting}>Add</button>
          </Form>
          )}
        </Formik>
      </div>
    )
  }
}
export default connect(mapStateToProps, actionCreators)(LoginForm);
