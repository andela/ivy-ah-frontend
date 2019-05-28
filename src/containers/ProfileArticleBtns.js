import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button, Modal
} from 'semantic-ui-react';
import { editArticle, deleteSingleArticle } from '../actions/profileActions';

const ProfileArticleBtns = ({
  ArticleEdit, articleDelete, article, userId
}) => {
  const [edit, setEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const onClickEdit = (e) => {
    e.preventDefault();
    ArticleEdit(article);
    setEdit(true);
  };

  const onClickDelete = (e) => {
    e.preventDefault();
    setConfirmDelete(true);
  };

  const deleteFalse = (e) => {
    e.preventDefault();
    setConfirmDelete(false);
  };

  const deleteArticle = (e) => {
    e.preventDefault();
    articleDelete(article.id);
    setConfirmDelete(false);
  };

  if (edit) {
    return <Redirect to="/createarticle" />;
  }

  return userId === article.user.id && (
    <div className="article-edit-wrapper">
      <button
        type="button"
        className="article-edit-button edit"
        onClick={onClickEdit}
      >
      edit
      </button>
      <button
        type="button"
        className="article-edit-button delete"
        onClick={onClickDelete}
      >
        delete
      </button>
      {(
        <Modal
          open={confirmDelete}
          onClose={e => e.preventDefault()}
          basic
          size="small"
        >
          <Modal.Content>
            <h3>Are you sure you want to delete this article</h3>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={deleteArticle} inverted>
              Yes
            </Button>
            <Button color="blue" onClick={deleteFalse} inverted>
              No
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  userId: auth.user ? auth.user.id : '' || '',
});

const mapDispatchToProps = dispatch => ({
  articleDelete: id => dispatch(deleteSingleArticle(id)),
  ArticleEdit: article => dispatch(editArticle(article))
});

ProfileArticleBtns.propTypes = {
  ArticleEdit: PropTypes.func.isRequired,
  articleDelete: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileArticleBtns);
