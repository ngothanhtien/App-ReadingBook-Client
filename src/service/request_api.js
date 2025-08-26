import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const fetchBooksByCategory = async (category) => {
  try {
    let query = '';
    switch (category) {
      case 'technology':
        query = `${BASE_URL}?q=subject:technology&orderBy=newest&maxResults=12`;
        break;
      case 'literature':
        query = `${BASE_URL}?q=subject:literature&orderBy=newest&maxResults=12`;
        break;
      case 'self-help':
        query = `${BASE_URL}?q=self+help&maxResults=20`;
        break;
      default:
        throw new Error('Unknown category');
    }

    const response = await axios.get(query);
    // Ở JS ta không có kiểu dữ liệu nên bỏ phần 'as { items?: Book[] }'
    const data = response.data;
    return data.items || [];
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};
