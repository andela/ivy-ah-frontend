import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';

const JoinButton = ({ token }) => (!token && (
  <button type="button" className="ui primary button header-button">
    {"Join Authors' Haven"}
  </button>
));

JoinButton.propTypes = {
  token: PropType.bool.isRequired
};

const mapStateToProps = ({ auth: { token } }) => ({
  token: !!token,
});

export default connect(mapStateToProps)(JoinButton);
