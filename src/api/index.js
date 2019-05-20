import axios from 'axios';

const API_BASE_URL = 'https://ivy-ah-backend-staging.herokuapp.com/api/v1';
const userObject = JSON.parse(localStorage.getItem('user'));
const token = userObject ? userObject.token : null;
export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token
  },
});

const urlParams = new URLSearchParams(window.location.search);
const resetToken = urlParams.get('resetToken');
export const signup = params => client.post('/users/signup', params);
export const login = params => client.post('/users/login', params);
export const forgotPassword = params => client.post('/users/forgotpassword', params);
export const resetPassword = params => axios({
  method: 'patch',
  url: `${API_BASE_URL}/users/resetpassword?resetToken=${resetToken}`,
  data: params
});
export const fetchBookmarks = () => client.get('/bookmarks');

export const addBookmark = article => client.post('/bookmarks', { article });

export const removeBookmark = article => client.delete('/bookmarks', {
  data: {
    article
  }
});

export const fetchArticle = id => client.get(`/articles/${id}`);
export const fetchProfile = id => client.get(`/profiles/${id}`);
export const fetchUserArticle = userId => client.get(`users/articles/${userId}`);
export const fetchUserFollowers = authorId => client.get(`profiles/${authorId}/followers`);
export const fetchArticles = (page, limit) => client.get('/articles/', { params: { page, limit } });
export const addArticle = article => client.post('/articles', article);
export const rateArticle = article => client.post('/articles/rating', article);
export const fetchLatestArticleHype = articleId => client.get(`/articles/rating/${articleId}`);
