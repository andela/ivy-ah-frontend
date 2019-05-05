import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import Button from './Button';

const SignupForm = ({
  submit,
  changed,
  clicked,
  loading,
  disabled,
  signedUp,
  value,
  blured
}) => (
  <div>
    <Form onSubmit={submit} size="huge">
      <Form.Group widths="equal">
        <Form.Field className="formInput">
          <Input
            required
            onBlur={blured}
            value={value.firstname}
            name="firstname"
            onChange={changed}
            type="text"
            control="input"
            placeholder="Firstname"
          />
        </Form.Field>
        <Form.Field className="formInput">
          <Input
            required
            onBlur={blured}
            value={value.lastname}
            name="lastname"
            onChange={changed}
            type="text"
            control="input"
            placeholder="Lastname"
          />
        </Form.Field>
      </Form.Group>
      <Form.Field className="formInput">
        <Input
          required
          onBlur={blured}
          value={value.email}
          name="email"
          onChange={changed}
          type="email"
          control="input"
          placeholder="Email"
        />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field className="formInput">
          <Input
            required

            onBlur={blured}
            value={value.password}
            name="password"
            onChange={changed}
            type="password"
            control="input"
            placeholder="Password"
          />
        </Form.Field>
        <Form.Field className="formInput">
          <Input
            required

            onBlur={blured}
            value={value.confirmPassword}
            name="confirmPassword"
            onChange={changed}
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
        <Button
          loading={loading}
          disabled={disabled}
          clicked={clicked}
          type="blueButton"
        >
          {signedUp ? 'Sign up successful' : 'Sign up'}
        </Button>
      </Form.Field>
    </Form>
  </div>
);

SignupForm.propTypes = {
  submit: PropTypes.func,
  changed: PropTypes.func,
  clicked: PropTypes.func,
  signedUp: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  blured: PropTypes.func,
};

const defaultFunc = input => input;

SignupForm.defaultProps = {
  signedUp: false,
  loading: false,
  disabled: false,
  clicked: defaultFunc,
  changed: defaultFunc,
  submit: defaultFunc,
  blured: defaultFunc
};

export default SignupForm;
