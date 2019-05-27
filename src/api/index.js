import axios from 'axios';
import store from '../store';

const API_BASE_URL = 'https://ivy-ah-backend-staging.herokuapp.com/api/v1';

export const getToken = () => store.getState().auth.token;

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getToken()
  },
});

const setToken = (() => {
  let cacheToken = '';
  return (token) => {
    if (cacheToken !== token) {
      client.defaults.headers.Authorization = token;
      cacheToken = token;
    }
  };
})();

store.subscribe(() => setToken(getToken()));

export const uploadProfileImage = (file) => {
  const url = 'https://api.cloudinary.com/v1_1/dcfc113t5/image/upload';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ivyteam');
  return axios.post(url, formData, { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
};

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
export const updateProfile = params => client.patch('/users', params);
export const postComment = (articleId, body) => client.post(`/comments/${articleId}`, { body });
export const reportArticle = article => client.post('/articles/report', article);
