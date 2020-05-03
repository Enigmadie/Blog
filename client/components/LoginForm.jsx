import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';
import connect from '../connect';

const LoginForm = ({ history, authenticationAdmin }) => {
  const { isAdmin } = useSelector((state) => state);
  const { t } = useTranslation();
  const blankMsg = t('blank');

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      login: Yup.string().required(blankMsg),
      password: Yup.string().required(blankMsg),
    }),
    onSubmit: async ({ login, password }, { resetForm }) => {
      await authenticationAdmin({ login, password });
      history.push('/');
      resetForm();
    },
  });
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = formik;

  const hasLoginErrors = errors.login && touched.login;
  const hasPasswordErrors = errors.password && touched.password;
  const hasInputErrors = hasLoginErrors || hasPasswordErrors;
  const isValidState = isAdmin.validationState === 'valid';

  const isDisabled = hasInputErrors || isSubmitting || !isValidState;

  const loginCn = cn({
    'content-input': true,
    error: hasLoginErrors,
  });

  const passwordCn = cn({
    'content-input': true,
    error: hasPasswordErrors,
  });

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="login">
        Login:
        <input
          name="login"
          type="text"
          value={values.login}
          className={loginCn}
          onChange={handleChange}
        />
      </label>
      { hasLoginErrors && (<div className="error-message">{errors.login}</div>)}
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          value={values.password}
          className={passwordCn}
          onChange={handleChange}
        />
      </label>
      { hasPasswordErrors && (<div className="error-message">{errors.password}</div>)}
      <button type="submit" disabled={isDisabled}>Submit</button>
    </form>
  );
};

export default connect(null)(LoginForm);
