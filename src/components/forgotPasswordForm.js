import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Header } from 'semantic-ui-react';
import Button from './Button';

const forgotPassword = ({
  submit, changed, clicked, emailSent, loading, disabled, match, passwordHandler,
}) => {
  console.log(passwordHandler);
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
        // border: '1px solid',
        boxShadow: '12px 12px 12px 12px rgba(0, 0, 255, .2)'
      }}
    >
      <Form onSubmit={submit} size="huge">
        <Header as="h4" style={{ textAlign: 'center', padding: '1rem', color: 'black' }}>{passwordHandler.header}</Header>
        <p style={{ textAlign: 'center', padding: '1rem', color: 'black' }}>
          {passwordHandler.text}
        </p>
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
            name="confirmPassword"
            onChange={changed}
            type="password"
            control="input"
            placeholder="Confirm Password"
          />
        </Form.Field>
        <Form.Field>
          <Button loading={loading} disabled={disabled} clicked={clicked} type="blueButton">
            { (emailSent) ? 'Email sent' : 'Send me a link'}
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
};

forgotPassword.propTypes = {
  submit: PropTypes.func.isRequired,
  changed: PropTypes.func.isRequired,
  clicked: PropTypes.func.isRequired,
  emailSent: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  passwordHandler: PropTypes.isRequired,
};

forgotPassword.defaultProps = {
  emailSent: false,
  loading: false,
  disabled: false
};

export default forgotPassword;
