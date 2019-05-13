import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import { Form, Input } from 'semantic-ui-react';
import Button from './Button';
import AuthErrorMessage from './AuthErrorMessage';
import { ForgotPasswordSchema } from '../helpers/passwordValidation';

const ForgotPasswordForm = ({
  authError, submit, loading, signedUp,
}) => (
  <Formik
    initialValues={{
      email: '',
    }}
    validationSchema={ForgotPasswordSchema}
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
        <div
          className="yellow-box"
          style={{
            position: 'absolute',
            height: '400px',
            width: '600px',
            margin: '-100px 0 0 -150px',
            top: '30%',
            left: '40%',
            padding: '35px',
            boxShadow: '2px 2px 12px 2px rgba(.2, .2, .2, .2)'
          }}
        >
          <div>
            <h2 style={{ textAlign: 'center', padding: '1rem', color: 'black' }}> Forgot Password?</h2>
            <p style={{ textAlign: 'center', padding: '1rem', color: 'black' }}>
    Enter your email to get a link to reset your pasword
            </p>
            <AuthErrorMessage
              hidden={!authError && formError.length === 0}
              error={authError || formError}
            />
            <Form onSubmit={handleSubmit} size="big">
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
              <Form.Field>
                <Button loading={loading} disabled={loading} type="blueButton">
                  {signedUp ? 'Link sent' : 'Submit'}
                </Button>
              </Form.Field>
            </Form>
          </div>
        </div>
      );
    }}
  </Formik>
);

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func,
  signedUp: PropTypes.bool,
  loading: PropTypes.bool,
  authError: PropTypes.oneOf(['null', null, PropTypes.object]).isRequired,
};

const defaultFunc = input => input;

ForgotPasswordForm.defaultProps = {
  signedUp: false,
  loading: false,
  submit: defaultFunc
};


export default ForgotPasswordForm;
