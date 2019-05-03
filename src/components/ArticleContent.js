import React from 'react';
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';

const ArticleContent = ({ body }) => {
  const contentState = convertFromRaw(JSON.parse(body));
  return (
    <div>
      <Editor
        editorClassName="main-editor"
        editorState={EditorState.createWithContent(contentState)}
        toolbarHidden
        readOnly
      />
    </div>

  );
};

ArticleContent.propTypes = {
  body: PropTypes.string.isRequired
};

export default ArticleContent;
