// import React from 'react';

// const Login = () => (
//   <div>
//     <h2>Login page</h2>
//   </div>
// );
// export default Login;

import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import Button from './Button';

const loginForm = ({ submit, changed, clicked }) => (
  <div>
    <Form onSubmit={submit} size="huge">
      <Form.Group widths="equal">
        <Form.Field className="formInput">
          <Input
            name="firstname"
            onChange={changed}
            type="text"
            control="input"
            placeholder="Firstname"
          />
        </Form.Field>
        <Form.Field className="formInput">
          <Input
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
            name="password"
            onChange={changed}
            type="password"
            control="input"
            placeholder="Password"
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
      </Form.Group>
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
        <Button clicked={clicked} type="blueButton">
      Sign Up
        </Button>
      </Form.Field>
    </Form>
  </div>
);

export default loginForm;
