import * as actions from '../actions/actionTypes';

const initialFollowState = {
  following: [],
  isFollowing: false,
  error: null,
};

export default (state = initialFollowState, action) => {
  switch (action.type) {
    case actions.FETCH_FOLLOWING_SUCCEEDED: {
      return {
        ...state,
        following: action.payload.user.following,
      };
    }
    case actions.FOLLOW_USER_SUCCEEDED: {
      return {
        ...state,
        following: state.following.concat(action.payload.authorId),
        isFollowing: true
      };
    }
    case actions.UNFOLLOW_USER_SUCCEEDED: {
      return {
        ...state,
        following: state.following.filter(follows => follows.id !== action.payload.authorId),
        isFollowing: false
      };
    }
    default:
      return state;
  }
};
