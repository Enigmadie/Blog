import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { asyncActions, RootState } from 'slices';
import { RouteComponentProps } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import cn from 'classnames';

const SignUp = ({ history }: RouteComponentProps): ReactElement => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state: RootState) => state);
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
    onSubmit: ({ login, password }, { resetForm }): void => {
      dispatch(asyncActions.registrationProfile({ login, password }));
      history.push('/login');
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
  const isValidState = profile.validationState === 'valid';

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
      <h1>Sign up for create a new profile</h1>
      <label htmlFor="login">
        Create a name:
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
        Create a password:
        <input
          type="password"
          name="password"
          value={values.password}
          className={passwordCn}
          onChange={handleChange}
        />
      </label>
      { hasPasswordErrors && (<div className="error-message">{errors.password}</div>)}
      <button type="submit" className="blog-submit" disabled={isDisabled}><span>Submit</span></button>
    </form>
  );
};

export default SignUp;
