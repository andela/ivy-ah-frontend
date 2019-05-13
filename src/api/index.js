import axios from 'axios';

const API_BASE_URL = 'https://ivy-ah-backend-staging.herokuapp.com/api/v1';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Iml2eWFkbWluQGdtYWlsLmNvbSIsImlkIjoiMDU1MDk2YWUtMDcyYy00MjJkLTgwMTctZDM2ZTFiZWNmNTNjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTU3MTUzNzc2fQ.SeUSBXKom7eHkEXgak8uS-3xqVKSwR3DvrGyIcn7CSs';

export const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token
  },
});
export const signup = params => client.post('/users/signup', params);
export const login = params => client.post('/users/login', params);
export const fetchBookmarks = () => client.get('/bookmarks');
export const addBookmark = article => client.post('/bookmarks', { article });
export const removeBookmark = article => client.delete('/bookmarks', {
  data: {
    article
  }
});
export const fetchArticle = id => client.get(`/articles/${id}`);
