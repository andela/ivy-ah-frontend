import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import Button from './Button';

const loginForm = ({
  submit, changed, clicked, loggedIn, loading, disabled
}) => (
  <div>
    <Form onSubmit={submit} size="huge">
      <Form.Field className="formInput">
        <Input
          name="email"
          onChange={changed}
          type="email"
          control="input"
          placeholder="Email"
        />
      </Form.Field>
      <Form.Field className="formInput">
        <Input
          name="password"
          onChange={changed}
          type="password"
          control="input"
          placeholder="Password"
        />
      </Form.Field>
      <Form.Field>
        <p style={{
          textAlign: 'center', padding: '2rem', fontSize: '1.1rem', color: 'black'
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
        <Button loading={loading} disabled={disabled} clicked={clicked} type="blueButton">
          { (loggedIn) ? 'Login successful' : 'Login'}
        </Button>
        <p style={{
          color: '#3157BE', marginBottom: '1.5rem', cursor: 'pointer', textAlign: 'center'
        }}
        >
          Forgot your password?
        </p>
      </Form.Field>
    </Form>
  </div>
);

loginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  clicked: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

loginForm.defaultProps = {
  loggedIn: false,
  loading: false,
  disabled: false
};

export default loginForm;
