import { SubReddit, RedditPost } from '../interfaces';
import Axios from 'axios';

const api_domain = process.env.REACT_APP_API_DOMAIN as string;

interface ApiResponse {
  status: 'online' | 'offline' | 'error'
}

interface SubRedditResponse extends ApiResponse {
  topSubRedditPost: RedditPost | null
}

export interface SubRedditNamesResponse extends ApiResponse {
  subRedditNames: string[] | []
}

/**
 * Will not be triggered more than every waitTime ms
 * @param fn callback to execute
 * @param waitTime cool off period
 */
export function debounce(fn: (...params: any[]) => any, waitTime = 1000) {
  let timeout: any = undefined;

  return function runFn(...args: any[]) {

    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, waitTime);
  }
}

const axios = Axios.create({ baseURL: api_domain });

// wrapper for timing out outbound fetch requests
async function fetchWithTimeout(resource: string, options: { timeout: number, method: string }) {
  const { timeout = 8000 } = options;

  const response = await axios.request({ method: options.method as any, url: resource });

  return response;
}

export async function fetchSubredditTopPost(name: string): Promise<SubRedditResponse> {

  try {
    const response = await fetchWithTimeout(`${api_domain}/load_subreddit_top_post?r=${name}`, { method: 'GET', timeout: 8000 });
    return {
      status: 'online',
      topSubRedditPost: response.data.top_post,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      // request timed out
      return {
        status: 'offline',
        topSubRedditPost: null,
      };
    } else {
      return {
        status: 'error',
        topSubRedditPost: null,
      };
    }
  }
}

export async function fetchSubredditNameOptions(searchText: string): Promise<SubRedditNamesResponse> {
  try {
    const response = await fetchWithTimeout(`${api_domain}/search_subreddits?searchText=${searchText}`, { timeout: 3000, method: 'POST' });
    return {
      status: 'online',
      subRedditNames: response.data as string[],
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      // request timed out
      return {
        status: 'offline',
        subRedditNames: [],
      };
    } else {
      return {
        status: 'error',
        subRedditNames: [],
      };
    }
  }
}
