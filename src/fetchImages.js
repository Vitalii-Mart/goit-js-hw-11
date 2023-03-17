import axios from 'axios';
import { handleError } from './index';

async function fetchPixabay(quary, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '33075314-b5ae829cc753917466890779e';
  try {
        const response = await axios.get(
          `${BASE_URL}?key=${KEY}&q=${quary}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
        );
        return response.data;
      } catch (error) {
        handleError(error.message);
      }
    }



export { fetchPixabay };