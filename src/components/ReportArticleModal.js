import React, { useState } from 'react';
import {
  Modal, Header, Button,
  Form, TextArea, Message, Icon
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { reportArticle } from 'Actions/reportArticleAction';
import { connect } from 'react-redux';

const ReportArticleModal = ({
  handleClose, modalOpen, articleId, reportNewArticle, loading
}) => {
  const [reportReason, setReason] = useState('');
  const [formError, setFormErrors] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userReport = {
      article: articleId,
      reason: reportReason
    };
    reportNewArticle(userReport);
  };

  const validateName = () => {
    setFormErrors(reportReason.length > 3 ? null : 'Name must be longer than 3 charcters');
  };

  const onFormInputChange = ({ target }) => {
    const { value } = target;
    setReason(value);
    validateName();
  };

  return (
    <Modal
      open={modalOpen}
      size="small"
      closeOnEscape
      closeOnDimmerClick
    >
      <Header icon="flag outline" content="Report Article" />
      <Modal.Content>
        <h3>
Reason for reporting this article
          <Icon name="pencil alternate" color="blue" size="small" />
        </h3>
        <Form>
          {formError ? <Message negative list={['Reason must be more than 5 characters']} /> : null}
          <TextArea
            placeholder="Tell us the reason.."
            onChange={onFormInputChange}
            onBlur={() => setFormErrors(false)}
          />
          Read our
          <a icon="external" href="https://www.freeprivacypolicy.com/terms/view/93e7738bf59060e5853b9202f94be85d" target="_blank" rel="noopener noreferrer">
            {' '}
Terms and conditions
            {' '}
            <Icon size="small" name="external" color="blue" />
          </a>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="button"
          icon="remove"
          color="orange"
          labelPosition="left"
          onClick={handleClose}
          content="Cancel"
        />
        <Button
          type="button"
          className="fas fa-bullhorn"
          color="blue"
          loading={loading}
          labelPosition="right"
          onClick={handleSubmit}
          content="Report"
        />
      </Modal.Actions>
    </Modal>
  );
};

ReportArticleModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired,
  reportNewArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  const { reportedArticle, loading, error } = state.reportArticleReducer;
  return {
    reportedArticle, loading, error
  };
};

const mapDispatchToProps = dispatch => ({
  reportNewArticle: article => dispatch(reportArticle(article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportArticleModal);
