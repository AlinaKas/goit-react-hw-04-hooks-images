// import axios from 'axios';
function fetchImages(searchQuery, page) {
  const API_KEY = '23098575-38c072e060e8821b5779b85db';
  const BASE_URL = 'https://pixabay.com/api/';
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No images for your request ${searchQuery}`),
    );
  });
}
const api = {
  fetchImages,
};

export default api;
