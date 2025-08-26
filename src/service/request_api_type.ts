import axios from 'axios'
import { Root } from '../model/book'

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes'

interface BookSearchOptions {
  category?: string 
  startIndex?: number
  maxResults?: number
  orderBy?: 'relevance' | 'newest' | 'rating'
}

export async function fetchBooksByCategory(options: BookSearchOptions): Promise<Root> {
    const {
      category,
      startIndex = 0,
      maxResults = 10,
      orderBy = 'newest'
    } = options

    const searchQuery = `subject:${category}`
    let url = "";
    if(category === "all"){
      url = `https://www.googleapis.com/books/v1/volumes?q=subject:science&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${orderBy}`;
    }else {
      url = `${GOOGLE_BOOKS_API}?q=${encodeURIComponent(searchQuery)}&startIndex=${startIndex}&maxResults=${maxResults}&orderBy=${orderBy}`
    }

    try {
      const response = await axios.get<Root>(url)
      if (response.status === 200) {
        const FilterItem = response.data.items?.filter(item =>
          item.volumeInfo?.imageLinks !== null
        )
        return {
          ...response.data, 
          items: FilterItem || []
        }
      } else {
        console.error(`API error: Status ${response.status}`)
        throw new Error(`Unexpected response status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
      throw error
    }
}
