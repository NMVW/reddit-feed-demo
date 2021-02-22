export const EmptyPost = {
  subreddit_name: '',
  title: '',
  score: 0,
  created_at: '',
  link_url: '',
  author_username: '',
  thumbnail_url: '',
  _last_fetched: '',
};

export interface RedditPost {
  subreddit_name: string
  title: string
  score: number
  created_at: string
  link_url: string
  author_username: string
  thumbnail_url: string
  _last_fetched: string
}

export interface SubReddit {
  name: string
  followedAt: string
  topPost?: RedditPost | null
}

export interface AppState {
  feed: {
    status: {
      subRedditName: string
      state: 'pending' | 'error' | ''
    }
    list: SubReddit[]
  }
}