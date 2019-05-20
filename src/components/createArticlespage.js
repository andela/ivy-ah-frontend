import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { EditorState, convertToRaw } from 'draft-js';
import { Message } from 'semantic-ui-react';
import { WithContext as ReactTagInput } from 'react-tag-input';
import { Editor } from 'react-draft-wysiwyg';
import Textarea from 'react-textarea-autosize';
import { createArticle } from '../actions/createArticleActions';

const CreateArticlePage = (props) => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { createNewArticle } = props;
    const tagItems = tags;
    const list = tagItems.map(tagItem => tagItem.text);

    const post = {
      title,
      description: title,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      plainText: JSON.stringify(editorState.getCurrentContent().getPlainText()),
      tagList: list
    };
    if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.exec(post.body)) {
      const [image] = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.exec(post.body);
      post.bannerImage = image;
    }
    createNewArticle(post);
  };

  const onChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddition = (tag) => {
    if (tags.length < 5) {
      setTags([...tags, tag]);
    } else {
      setFormError('The maximum number of tags allowed is 5');
    }
  };

  const handleDrag = (tag, currPos, newPos) => {
    const userTags = [...tags];
    const newTags = userTags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
    setFormError('');
  };

  const uploadImageCallBack = (file) => {
    const url = 'https://api.cloudinary.com/v1_1/dcfc113t5/image/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ivyteam');
    return axios.post(url, formData, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  };

  return (
    <div className="create-article-wrapper">
      <div className="publish-wrapper">
        <button className="article-button" type="submit" onClick={onSubmit}>Publish</button>
      </div>
      <div>
        <Textarea className="article-title" name="title" onChange={onChange} placeholder="Title..." />
      </div>
      <Editor
        toolbarOnFocus
        editorClassName="main-editor"
        placeholder="Write your story..."
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="editor-toolbar"
        toolbar={{
          options: ['inline', 'blockType', 'textAlign', 'colorPicker', 'link', 'emoji', 'image', 'history'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            uploadCallback: uploadImageCallBack,
            placeHolder: 'Write your story...',
            previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alignmentEnabled: false,
            alt: { present: false, mandatory: false },
            defaultSize: {
              height: '500',
              width: '1000',
            },
          }
        }}
      />
      <ReactTagInput
        tags={tags}
        style={{ height: '30px', width: '99.5%' }}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={[188, 13, 9, 32]}
        placeholder="Add tags (maximum of 5tags)"
        inputFieldPosition="inline"
        classNames={{
          tags: 'tagsClass',
          tagInput: 'tagInputClass',
          tagInputField: 'tag-input-field-class',
          selected: 'selectedClass',
          tag: 'tagClass',
          remove: 'removeClass',
          suggestions: 'suggestionsClass',
          activeSuggestion: 'activeSuggestionClass'
        }}
      />
      <div>
        {(formError) ? <Message negative list={[formError]} /> : ''}
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

CreateArticlePage.propTypes = {
  createNewArticle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { createdArticle, loading, error } = state.createArticleReducer;
  return {
    createdArticle, loading, error
  };
};

const mapDispatchToProps = dispatch => ({
  createNewArticle: article => dispatch(createArticle(article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticlePage);
