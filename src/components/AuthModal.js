import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';

const styledModal = ({
  close,
  size = 'small',
  dimmer = true,
  children,
  open
}) => (
  <div>
    <Modal
      onClose={close}
      basic
      closeOnDimmerClick
      open={open}
      dimmer={dimmer}
      size={size}
    >
      {children}
    </Modal>
  </div>
);

styledModal.propTypes = {
  open: PropTypes.bool.isRequired,
  size: PropTypes.string,
  dimmer: PropTypes.oneOf([true, 'inverted', 'blurring']),
  children: PropTypes.element.isRequired,
  close: PropTypes.func.isRequired
};

styledModal.defaultProps = {
  size: 'small',
  dimmer: true
};
export default styledModal;
