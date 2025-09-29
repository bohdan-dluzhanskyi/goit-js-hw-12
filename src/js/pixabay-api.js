
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52388349-b652c0030e98c4b6e488e9cd6'; 
const PER_PAGE = 15;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
  },
});

export async function getImagesByQuery(query, page = 1) {
  try {
    const response = await api.get('', {
      params: {
        q: query,
        page,
      },
    });
    
    return response.data;
  } catch (error) {
    
    throw error;
  }
}

export { PER_PAGE };
