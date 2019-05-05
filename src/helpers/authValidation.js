const authValidation = (fieldName, formInput) => {
  const emailRegx = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  const symbolCheck = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;
  const { formError } = formInput;
  const trimmedFieldValue = formInput.fieldName;

  switch (fieldName) {
    case 'email':
      if (!emailRegx.test(trimmedFieldValue)) {
        formError.Email = 'Please provide a valid email';
      } else if (formError.Email) {
        delete formError.Email;
      }
      return formError;
    case 'firstname':
      if (
        trimmedFieldValue === ''
        || trimmedFieldValue === undefined
        || trimmedFieldValue.toLowerCase() === 'undefined'
        || trimmedFieldValue.length < 3
        || symbolCheck.test(trimmedFieldValue)
      ) {
        formError['First name'] = 'First name should be more two characters and should not contain symbols';
      } else if (formError['First name']) {
        delete formError['First name'];
      }
      return formError;
    case 'lastname':
      if (
        trimmedFieldValue === ''
        || trimmedFieldValue === undefined
        || trimmedFieldValue.toLowerCase() === 'undefined'
        || trimmedFieldValue.length < 3
        || symbolCheck.test(trimmedFieldValue)
      ) {
        formError['Last name'] = 'First name should be more two characters and should not contain symbols';
      } else if (formError['Last name']) {
        delete formError['Last name'];
      }
      return formError;
    case 'password':
      if (
        trimmedFieldValue === ''
        || trimmedFieldValue === undefined
        || trimmedFieldValue.length < 8
      ) {
        formError.Password = 'First name should be more two characters and should not contain symbols';
      } else if (formError.Password) {
        delete formError.Password;
      }
      return formError;
    case 'confirmPassword':
      if (
        trimmedFieldValue === ''
      || trimmedFieldValue === undefined
      || trimmedFieldValue.length !== formInput.password
      ) {
        formError['Confirm Password'] = 'Password fields do not match';
      } else if (formError['Confirm Password']) {
        delete formError['Confirm Password'];
      }
      return formError;
    default:
      return formError;
  }
};

export default authValidation;
