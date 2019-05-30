import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { Form, Input } from 'semantic-ui-react';
import Button from './Button';
import AuthErrorMessage from './AuthErrorMessage';
import { LoginSchema } from '../helpers/authValidation';

const loginForm = ({
  authError, submit, loading, loggedIn
}) => (
  <Formik
    initialValues={{
      email: '',
      password: ''
    }}
    validationSchema={LoginSchema}
    onSubmit={submit}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
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
            <Form.Field>
              <p
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  fontSize: '1.1rem',
                  color: 'black'
                }}
              >
                By clicking Log in, you agree to our
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
                {loggedIn ? 'Log in successful' : 'Log in'}
              </Button>
            </Form.Field>
            <a style={{ textAlign: 'center', cursor: 'pointer', display: 'block' }} href="/forgotPassword">Forgot Password?</a>
          </Form>
        </div>
      );
    }}
  </Formik>
);

loginForm.propTypes = {
  submit: PropTypes.func,
  loggedIn: PropTypes.bool,
  loading: PropTypes.bool,
  authError: PropTypes.oneOf(['null', null, PropTypes.object])
};

const defaultFunc = input => input;

loginForm.defaultProps = {
  loggedIn: false,
  loading: false,
  submit: defaultFunc,
  authError: null
};

export default loginForm;
