import { SubReddit } from '../interfaces';

const feed_api_url = process.env.REACT_APP_FEED_API_URL as string;
const search_api_url = process.env.REACT_APP_SEARCH_API_URL as string;

interface ApiResponse {
  status: 'online' | 'offline' | 'error'
}

interface SubRedditResponse extends ApiResponse {
  subReddit: SubReddit | null
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

// wrapper for timing out outbound fetch requests
async function fetchWithTimeout(resource: string, options: { timeout: number, method?: string, headers?: any }) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    mode: 'no-cors',
    signal: controller.signal,
  });

  clearTimeout(id);

  return response;
}

export async function fetchSubredditTopPost(name: string): Promise<SubRedditResponse> {

  try {
    const response = await fetchWithTimeout(`${feed_api_url}/sub-reddit?name=${name}`, { timeout: 8000 });
    const data = await response.json();
    return {
      status: 'online',
      subReddit: data.subReddit,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      // request timed out
      return {
        status: 'offline',
        subReddit: null,
      };
    } else {
      return {
        status: 'error',
        subReddit: null,
      };
    }
  }
}

export async function fetchSubredditNameOptions(searchText: string): Promise<SubRedditNamesResponse> {
  try {
    const response = await fetchWithTimeout(`${search_api_url}?query=${searchText}`, { timeout: 3000, method: 'POST', headers: { 'Accept-Encoding': 'application/json'} });
    debugger;
    const data = await response.json();
    const subRedditNames = data.subreddits.map((sub: any) => sub.name);
    return {
      status: 'online',
      subRedditNames: subRedditNames,
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
