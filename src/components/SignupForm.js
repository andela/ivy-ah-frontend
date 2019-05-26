import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { Form, Input } from 'semantic-ui-react';
import Button from './Button';
import AuthErrorMessage from './AuthErrorMessage';
import { SignupSchema } from '../helpers/authValidation';

const SignupForm = ({
  authError, submit, loading, signedUp
}) => (
  <Formik
    initialValues={{
      email: '',
      lastname: '',
      firstname: '',
      password: '',
      confirmPassword: ''
    }}
    validationSchema={SignupSchema}
    onSubmit={submit}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    }) => {
      const formError = Object.keys(errors)
        .filter(keys => keys in touched)
        .map(key => errors[key]);
      return (
        <div>
          <AuthErrorMessage
            hidden={!authError && formError.length === 0}
            error={authError || formError}
          />
          <Form onSubmit={handleSubmit} size="huge">
            <Form.Group widths="equal">
              <Form.Field className="formInput">
                <Input
                  required
                  onBlur={handleBlur}
                  value={values.firstname}
                  name="firstname"
                  onChange={handleChange}
                  type="text"
                  // control="input"
                  placeholder="Firstname"
                />
              </Form.Field>
              <Form.Field className="formInput">
                <Input
                  required
                  onBlur={handleBlur}
                  value={values.lastname}
                  name="lastname"
                  onChange={handleChange}
                  type="text"
                  control="input"
                  placeholder="Lastname"
                />
              </Form.Field>
            </Form.Group>
            <Form.Field className="formInput">
              <Input
                required
                onBlur={handleBlur}
                value={values.email}
                name="email"
                onChange={handleChange}
                type="email"
                control="input"
                placeholder="Email"
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field className="formInput">
                <Input
                  required
                  onBlur={handleBlur}
                  value={values.password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  control="input"
                  placeholder="Password"
                />
              </Form.Field>
              <Form.Field className="formInput">
                <Input
                  required
                  onBlur={handleBlur}
                  value={values.confirmpassword}
                  name="confirmPassword"
                  onChange={handleChange}
                  type="password"
                  control="input"
                  placeholder="Confirm Password"
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <p
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  fontSize: '1.1rem',
                  color: 'black'
                }}
              >
                By clicking Sign Up, you agree to our
                {'  '}
                <span style={{ color: '#3157BE', cursor: 'pointer' }}>
                  Terms of Use
                </span>
                {' '}
                and
                {' '}
                <span style={{ color: '#3157BE', cursor: 'pointer' }}>
                  {' '}
                  Privacy Policy
                  {' '}
                </span>
              </p>
              <Button loading={loading} disabled={loading} type="blueButton">
                {signedUp ? 'Sign up successful' : 'Sign up'}
              </Button>
            </Form.Field>
          </Form>
        </div>
      );
    }}
  </Formik>
);

SignupForm.propTypes = {
  submit: PropTypes.func,
  signedUp: PropTypes.bool,
  loading: PropTypes.bool,
  authError: PropTypes.oneOf(['null', null, PropTypes.object]),
};

const defaultFunc = input => input;

SignupForm.defaultProps = {
  signedUp: false,
  loading: false,
  submit: defaultFunc,
  authError: null,
};

export default SignupForm;
