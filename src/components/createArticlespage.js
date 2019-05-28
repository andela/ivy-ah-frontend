import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Message } from 'semantic-ui-react';
import { WithContext as ReactTagInput } from 'react-tag-input';
import { Editor } from 'react-draft-wysiwyg';
import Textarea from 'react-textarea-autosize';
import { Redirect } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import Header from './Header';
import { createArticle, updateArticle } from '../actions/createArticleActions';

const CreateArticlePage = ({
  createdArticle: { article },
  updateNewArticle,
  createNewArticle,
  edit,
}) => {
  const [title, setTitle] = useState(edit.title || '');
  const [editorState, setEditorState] = useState(edit.body
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(edit.body)))
    : EditorState.createEmpty());
  const [tags, setTags] = useState(edit.tagList.map(tag => ({
    id: tag, text: tag
  })) || []);
  const [formError, setFormError] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [currPost, setPost] = useState({});
  const [timer, setTimer] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [position, setPosition] = useState({
    x: 0, y: 0, width: 0
  });

  const checkHighlight = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (!text) {
      return setShowToolbar(false);
    }
    const selectionRange = selection.getRangeAt(0);
    const startNode = selectionRange.startContainer.parentNode;
    const endNode = selectionRange.endContainer.parentNode;
    const articleBody = document.querySelector('.main-editor');
    if (!articleBody.contains(startNode) || !articleBody.contains(startNode)) {
      return;
    }
    if (!startNode.isSameNode(endNode)) {
      return;
    }
    const { x, y, width } = selectionRange.getBoundingClientRect();
    setShowToolbar(true);
    setPosition({
      x,
      y: y + window.scrollY - 50,
      width
    });
  };

  const onEditorStateChange = (newEditorState) => {
    if (showToolbar) checkHighlight();
    setEditorState(newEditorState);
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

  const postArticle = (isPublished) => {
    if (article && article.isPublished) { return; }

    const articleData = { ...currPost, isPublished };
    if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.exec(articleData.body)) {
      const [image] = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.exec(articleData.body);
      articleData.bannerImage = image;
    }

    if (article) {
      updateNewArticle(article.id, articleData);
    } else {
      createNewArticle(articleData);
    }
  };

  const onSubmit = (isPublished = undefined) => {
    const tagItems = tags;
    const list = tagItems.map(tagItem => tagItem.text);

    if (!title) { return; }
    if (!title && isPublished) {
      return toast.error('please give your article a title');
    }

    const post = {
      title,
      description: title,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      plainText: editorState.getCurrentContent().getPlainText(),
      tagList: list,
    };

    if (!post.plainText) { return; }

    if (!post.plainText && isPublished) {
      return toast.error('tell your story first');
    }

    if (isPublished && timer) { clearTimeout(timer); }

    if (!isEqual(post, currPost) || isPublished) {
      setPost(post);
      return isPublished && postArticle(isPublished);
    }

    if (isPublished === false) postArticle(isPublished);
  };

  useEffect(() => {
    window.addEventListener('mouseup', checkHighlight);
    return () => {
      window.removeEventListener('mouseup', checkHighlight);
    };
  }, [position]);

  useEffect(() => {
    if (timer) { return; }
    const timeout = setTimeout(() => {
      setTimer(null);
      setShouldUpdate(true);
    }, 5000);
    setTimer(timeout);
  }, [currPost]);

  useEffect(() => {
    if (!shouldUpdate) { return onSubmit(); }
    onSubmit(false);
    setShouldUpdate(false);
  });

  if (article && article.isPublished) {
    return <Redirect to={`/article/${article.id}`} />;
  }
  return (
    <div className="create-article-container">
      <Header />
      <div className="create-article-wrapper">
        <div className="publish-wrapper">
          <button className="article-button" type="button" onClick={() => onSubmit(true)}>Publish</button>
        </div>
        <div>
          <Textarea value={title} className="article-title" name="title" onChange={onChange} placeholder="Title..." />
        </div>
        <Editor
          editorClassName="main-editor edit"
          placeholder="Write your story..."
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="editor-toolbar"
          toolbarStyle={{
            visibility: showToolbar ? 'visible' : 'hidden',
            position: 'absolute',
            zIndex: 2,
            top: `${position.y}px`,
            left: `${position.x}px`,
          }}
          toolbar={{
            options: ['inline', 'textAlign', 'fontSize', 'link', 'image'],
            inline: {
              inDropdown: false,
              options: ['bold', 'italic'],
            },
            fontSize: {
              options: [14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
            },
            textAlign: {
              inDropdown: false,
              options: ['left', 'center'],
            },
            link: {
              className: 'editor-link-btn',
              inDropdown: false,
              options: ['link']
            },
            image: {
              className: 'editor-image-btn',
              uploadCallback: uploadImageCallBack,
              placeHolder: 'Write your story...',
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,imagex/svg',
              alignmentEnabled: false,
              urlEnabled: false,
              alt: { present: false, mandatory: false },
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
          placeholder="Add tags (maximum of 5 tags)"
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
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

CreateArticlePage.propTypes = {
  createNewArticle: PropTypes.func.isRequired,
  updateNewArticle: PropTypes.func.isRequired,
  createdArticle: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired
};

const mapStateToProps = ({ createArticleReducer }) => ({
  ...createArticleReducer
});

const mapDispatchToProps = dispatch => ({
  createNewArticle: article => dispatch(createArticle(article)),
  updateNewArticle: (id, article) => dispatch(updateArticle(id, article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticlePage);
