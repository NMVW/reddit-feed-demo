export interface RedditPost {
  subject: string
  linkUrl: string
  iconUrl: string
  score: number
  dateTime: Date
}

export interface SubReddit {
  name: string
  topPost: RedditPost
  lastUpdated: Date
}

export interface AppState {
  feed: {
    status: {
      subRedditName: string
      state: 'pending' | 'error' | ''
    }
    list: Array<SubReddit> | []
  }
}