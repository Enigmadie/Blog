import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = ({ isAdmin: { status } }) => ({ isAdmin: status });

const LoginForm = ({ history, authenticationAdmin }) => (
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
   onSubmit={ async({ login, password }, { setSubmitting, resetForm }) => {
     await authenticationAdmin({ login, password });
     history.push('/');
     resetForm();
     setSubmitting(false);
   }}
    >
  {({ errors, touched, isSubmitting }) => {
    const hasLoginErrors = errors.login && touched.login;
    const hasPasswordErrors = errors.password && touched.password;

    const loginCn = cn({
      'content-input': true,
      'error': hasLoginErrors,
    });

    const passwordCn = cn({
      'content-input': true,
      'error': hasPasswordErrors,
    });

    return (
      <Form>
        <label htmlFor='login'>Login:</label>
        <Field type='text' name='login' className={loginCn}/>
        { hasLoginErrors && (<div className='error-message'>{errors.login}</div>)}

        <label htmlFor='password'>Password:</label>
        <Field type='password' name='password' className={passwordCn}/>
        { hasPasswordErrors && (<div className='error-message'>{errors.password}</div>)}

        <button type='submit' disabled={isSubmitting}>Add</button>
      </Form>
      )}}
    </Formik>
  </div>
)
export default connect(mapStateToProps)(LoginForm);
