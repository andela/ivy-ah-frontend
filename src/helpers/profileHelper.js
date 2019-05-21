import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const profileRedirect = ({ match }) => (
  <Redirect to={`/profile/${match.params.id}`} />
);

export const contentHandler = (loadedContentType, profileContent, isEditing) => {
  let newContent;
  let latestContent;
  let content;
  switch (loadedContentType) {
    case 'articles':
      latestContent = profileContent.articles.shift();
      content = profileContent;
      return [latestContent, content];
    case 'followers':
      newContent = [...profileContent];
      latestContent = newContent.splice(0, 3);
      content = newContent;
      return [latestContent, content];
    case 'bio':
      latestContent = profileContent;
      content = null;
      return [latestContent, content];
    case 'bookmarks':
      if (profileContent.length !== 0) {
        [latestContent] = profileContent;
        content = profileContent.slice(1);
      } else {
        latestContent = '0 articles';
      }
      return [latestContent, content];
    default:
      content = profileContent;
  }
};

export const uploadProfileImage = (file) => {
  const url = 'https://api.cloudinary.com/v1_1/dcfc113t5/image/upload';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ivyteam');
  return axios.post(url, formData, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
};


export const profileBioValidator = (fieldName, formInputs) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/g;
  const fieldValue = formInputs[fieldName].trim();
  const error = formInputs.bioError || {};

  if (!fieldValue) {
    error[fieldName] = `${fieldName} is required`;
    return error;
  }
  if (error[fieldName]) {
    delete error[fieldName];
  }

  switch (fieldName) {
    case 'firstname':
      if (symbolRegex.test(fieldValue)) {
        error[
          fieldName
        ] = `${fieldName} should not contain symbols`;
        return error;
      }
      if (fieldValue.length < 3) {
        error[
          fieldName
        ] = `Your ${fieldName} is too short. ${fieldName} should be more than 2 characters.`;
        return error;
      }
      break;

    case 'lastname':
      if (symbolRegex.test(fieldValue)) {
        error[
          fieldName
        ] = `${fieldName} should not contain symbols`;
        return error;
      }
      if (fieldValue.length < 3) {
        error[
          fieldName
        ] = `Your ${fieldName} is too short. ${fieldName} should be more than 2 characters.`;
        return error;
      }
      break;

    case 'email':
      if (!emailRegex.test(fieldValue)) {
        error[
          fieldName
        ] = 'Please provide a valid email';
        return error;
      }
      break;
    case 'bio':
      if (symbolRegex.test(fieldValue)) {
        error[
          fieldName
        ] = `${fieldName} bio should not contain symbols`;
        return error;
      }
      if (fieldValue.length > 100) {
        error[
          fieldName
        ] = `Your ${fieldName} is too long. ${fieldName} should not be more than 100 characters.`;
        return error;
      }
      break;
    default:
      return error;
  }
};

profileRedirect.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default profileBioValidator;
