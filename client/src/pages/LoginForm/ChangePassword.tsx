import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { asyncActions, RootState } from 'slices';
import { useTranslation } from 'react-i18next';

import * as Yup from 'yup';
import cn from 'classnames';

const ChangePassword = (): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const blankMsg = t('blank');
  const { profile } = useSelector((state: RootState) => state);
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      oldPassword2: '',
      newPassword: '',
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required(blankMsg),
      oldPassword2: Yup.string().required(blankMsg),
      newPassword: Yup.string().required(blankMsg),
    }),
    onSubmit: ({ oldPassword, newPassword }, { resetForm }): void => {
      dispatch(asyncActions.changePassword({
        oldPassword,
        newPassword,
      }));
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

  const hasOldPasswordErrors = errors.oldPassword && touched.oldPassword;
  const hasOldPassword2Errors = errors.oldPassword2 && touched.oldPassword2;
  const hasNewPasswordErrors = errors.newPassword && touched.newPassword;

  const isPasswordsNotEqual = values.oldPassword !== values.oldPassword2;

  const hasInputErrors = hasOldPasswordErrors
    || hasNewPasswordErrors
    || hasOldPassword2Errors
    || isPasswordsNotEqual;

  const isValidState = profile.validationState === 'valid';

  const isDisabled = hasInputErrors || isSubmitting || !isValidState;

  const newPasswordCn = cn({
    'content-input': true,
    error: hasNewPasswordErrors,
  });

  const oldPasswordCn = cn({
    'content-input': true,
    error: hasOldPasswordErrors || isPasswordsNotEqual,
  });

  const oldPassword2Cn = cn({
    'content-input': true,
    error: hasOldPassword2Errors || isPasswordsNotEqual,
  });
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Change password</h1>
      <label htmlFor="oldPassword">
        Enter the current password:
        <input
          name="oldPassword"
          type="password"
          value={values.oldPassword}
          className={oldPasswordCn}
          onChange={handleChange}
        />
      </label>
      { (hasOldPasswordErrors || isPasswordsNotEqual) && (<div className="error-message">{errors.oldPassword}</div>)}
      <label htmlFor="oldPassword2">
        Repeat the current password:
        <input
          name="oldPassword2"
          type="password"
          value={values.oldPassword2}
          className={oldPassword2Cn}
          onChange={handleChange}
        />
      </label>
      { (hasOldPassword2Errors || isPasswordsNotEqual) && (<div className="error-message">{errors.oldPassword}</div>)}
      <label htmlFor="newPassword">
        Create a new password:
        <input
          name="newPassword"
          type="password"
          value={values.newPassword}
          className={newPasswordCn}
          onChange={handleChange}
        />
      </label>
      { hasNewPasswordErrors && (<div className="error-message">{errors.newPassword}</div>)}
      <button type="submit" className="blog-submit" disabled={isDisabled}><span>Submit</span></button>
    </form>
  );
};

export default ChangePassword;
