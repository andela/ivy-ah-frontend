import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[a-z0-9]+$/i, 'symbols are not allowed in first name')
    .min(3,
      'Your First name is too short. Please provide a First name with more than 3 characters')
    .max(50,
      'Your First name is too long. Please provide a First name with less than 50 characters!')
    .required('First name is required'),
  lastname: Yup.string()
    .matches(/^[a-z0-9]+$/i, 'symbols are not allowed in last name')
    .min(3,
      'Your Last name is too short. Please provide a Last name with more than 3 characters')
    .max(50,
      'Your Last name is too long. Please provide a Last name with less than 50 characters!')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is Required'),
  password: Yup.string()
    .min(8, 'Password should be more than 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string().when('password', {
    is: val => !!(val && val.length > 0),
    then: Yup.string().oneOf([Yup.ref('password')],
      'Both password field need to be the same')
  })
});

export default SignupSchema;
