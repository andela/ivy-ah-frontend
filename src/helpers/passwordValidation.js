import * as Yup from 'yup';

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is Required'),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should be more than 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string().when('password', {
    is: val => !!(val && val.length > 0),
    then: Yup.string().oneOf([Yup.ref('password')],
      'Both password field need to be the same')
  })
});
