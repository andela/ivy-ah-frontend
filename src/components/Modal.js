import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';

const styledModal = ({
  callToAction, size = 'small', dimmer = true, children
}) => (
  <Modal basic dimmer={dimmer} size={size} trigger={<Button>{callToAction}</Button>}>
    {children}
  </Modal>
);

styledModal.propTypes = {
  callToAction: PropTypes.string.isRequired,
  size: PropTypes.string,
  dimmer: PropTypes.string,
  children: PropTypes.element.isRequired
};

styledModal.defaultProps = {
  size: 'small',
  dimmer: true
};
export default styledModal;
