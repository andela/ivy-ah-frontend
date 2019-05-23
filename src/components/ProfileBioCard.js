import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, TextArea } from 'semantic-ui-react';
import { profileBioValidator } from '../helpers/profileHelper';

const ProfileBioCard = ({
  bio,
  editingProfile,
  cancelledEditing,
  saveProfile,
  savingProfile,
  changingProfileImage
}) => {
  const [bioValues, setBioValues] = useState({ ...bio, bioError: {} });
  const bioError = bioValues.bioError || {};

  const onChangeHanger = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newBioValues = { ...bioValues };
    newBioValues[fieldName] = fieldValue;
    setBioValues(newBioValues);
  };

  const onBlurHandler = (event) => {
    const check = profileBioValidator(event.target.name, bioValues);
    const changedBioValues = { ...bioValues };
    changedBioValues.bioError = {
      ...check
    };
    setBioValues(changedBioValues);
  };

  return (
    <Form>
      <div className="profile-bio">
        <Form.Field inline>
          <div
            className="label"
            style={{ width: '7rem', display: 'inline-block' }}
          >
            First name
          </div>
          <Input
            onBlur={onBlurHandler}
            name="firstname"
            value={bioValues.firstname}
            disabled={!editingProfile}
            placeholder="Yet to provide a first name"
            onChange={onChangeHanger}
          />
          {bioError.firstname ? (
            <p className="profileError">{bioValues.bioError.firstname}</p>
          ) : null}
        </Form.Field>
        <Form.Field inline>
          <div
            className="label"
            style={{ width: '7rem', display: 'inline-block' }}
          >
            Last name
          </div>
          <Input
            onBlur={onBlurHandler}
            name="lastname"
            value={bioValues.lastname}
            disabled={!editingProfile}
            placeholder="Yet to provide a last name"
            onChange={onChangeHanger}
          />
          {bioError.lastname ? (
            <p className="profileError">{bioValues.bioError.lastname}</p>
          ) : null}
        </Form.Field>
        <Form.Field inline>
          <div
            className="label"
            style={{ width: '7rem', display: 'inline-block' }}
          >
            email
          </div>
          <Input
            onBlur={onBlurHandler}
            name="email"
            value={bioValues.email}
            disabled={!editingProfile}
            placeholder="Yet to provide an email"
            onChange={onChangeHanger}
          />
          {bioError.email ? (
            <p className="profileError">{bioValues.bioError.email}</p>
          ) : null}
        </Form.Field>
        <Form.Field inline>
          <div
            className="label"
            style={{ width: '7rem', display: 'inline-block' }}
          >
            bio
          </div>
          <TextArea
            onBlur={onBlurHandler}
            name="bio"
            value={bioValues.bio}
            disabled={!editingProfile}
            style={{ display: 'inline', width: '60%' }}
            placeholder="Yet to provid bio"
            onChange={onChangeHanger}
          />
          {bioError.bio ? (
            <p className="profileError">{bioValues.bioError.bio}</p>
          ) : null}
        </Form.Field>
        {editingProfile ? (
          <div>
            <button
              disabled={
                savingProfile
                || changingProfileImage
                || !(Object.keys(bioError).length === 0)
              }
              style={{
                backgroundColor: '#fff',
                color: 'blue',
                width: '25%',
                border: '1px solid blue'
              }}
              type="button"
              onClick={() => saveProfile(bioValues)}
              className="ui button"
            >
              Save
            </button>
            <button
              disabled={savingProfile || changingProfileImage}
              style={{ width: '25%', border: '1px solid red' }}
              onClick={() => {
                const newBio = { ...bio };
                setBioValues(newBio);
                cancelledEditing();
              }}
              className="profileBtn ui red basic button"
              type="button"
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </Form>
  );
};

ProfileBioCard.propTypes = {
  bio: PropTypes.shape({}).isRequired,
  editingProfile: PropTypes.bool.isRequired,
  cancelledEditing: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  savingProfile: PropTypes.bool.isRequired,
  changingProfileImage: PropTypes.bool.isRequired
};

export default ProfileBioCard;
