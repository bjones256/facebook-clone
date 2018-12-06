
const USER_LOGGED_IN = 'USER_LOGGED_IN'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
const SET_POSTS = 'SET_POSTS'
const GET_REQUESTS = 'GET_REQUESTS'
const GET_SENT_REQUESTS = 'GET_SENT_REQUESTS'
const GET_FRIEND_IDS = 'GET_FRIEND_IDS'

const initialState = {
  isAuthenticated: false,
  user: {},
  posts: [],
  requests:[],
  sentRequests:[],
  friendIds:[]
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, isAuthenticated: true , user: action.payload }
    case USER_LOGGED_OUT:
      return { ...state, isAuthenticated: false, user: {} }
    case SET_POSTS:
      return { ...state, posts: action.payload }
    case GET_REQUESTS:
      return { ...state, requests: action.payload }
    case GET_SENT_REQUESTS:
      return { ...state, sentRequests: action.payload }
    case GET_FRIEND_IDS:
      return { ...state, friendIds: action.payload }
    default:
      return state;
  }
}

export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function userLoggedOut() {
  return {
    type: USER_LOGGED_OUT
  }
}

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    payload: posts
  }
}
export function getRequests(requests) {
  return {
    type: GET_REQUESTS,
    payload: requests
  }
}
export function getSentRequests(sent) {
  return {
    type: GET_SENT_REQUESTS,
    payload: sent
  }
}
export function getFriendIds(friends) {
  return {
    type: GET_FRIEND_IDS,
    payload: friends
  }
}

