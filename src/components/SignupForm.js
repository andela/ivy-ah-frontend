import React from 'react';
import { Form } from 'semantic-ui-react';
import Button from './Button';

const SignupForm = () => (
  <div>
    <Form size="huge">
      <Form.Group widths="equal">
        <Form.Field className="formInput" type="text" control="input" fluid placeholder="Firstname" />
        <Form.Field className="formInput" type="text" control="input" fluid placeholder="Lastname" />
      </Form.Group>
      <Form.Input className="formInput" type="email" fluid placeholder="Email" />
      <Form.Group className="formInput" widths="equal">
        <Form.Field fluid control="input" placeholder="Password" />
        <Form.Field fluid control="input" placeholder="Confirm Password" />
      </Form.Group>
    </Form>
    <p style={{ textAlign: 'center', padding: '1rem', color: 'black' }}>
      By clicking Sign Up, you agree to our
      <span style={{ color: '#3157BE', cursor: 'pointer' }}> Terms of Use  </span>
      and
      {' '}
      <span style={{ color: '#3157BE', cursor: 'pointer' }}> Privacy Policy  </span>
    </p>
    <Button type="blueButton">Sign Up</Button>
  </div>
);

export default SignupForm;
