export const EVENT_HOST_CREATE_GAME = { name: 'host_create_game' };

export const EVENT_HOST_FINISH_GAME = { name: 'host_finish_game' };

export const EVENT_HOST_GO_TO_NEXT_QUESTION = { name: 'host_go_to_next_question' };

export const EVENT_HOST_REMOVE_PLAYER = { name: 'host_remove_player' };

export const EVENT_HOST_SHOW_ANSWER = { name: 'host_show_answer' };

export const EVENT_HOST_START_GAME = { name: 'host_start_game' };

export const EVENT_LOGIN_ANONYMOUS = {
  name: 'login',
  params: {
    method: 'anonymous',
  },
};

export const EVENT_LOGIN_FACEBOOK = {
  name: 'login',
  params: { method: 'facebook' },
};

export const EVENT_LOGIN_FAILED = { name: 'login_failed' };

export const EVENT_LOGIN_GOOGLE = {
  name: 'login',
  params: {
    method: 'google',
  },
};

export const EVENT_LOGOUT = { name: 'logout' };

export const EVENT_PLAYER_ANSWER = { name: 'player_answer' };

export const EVENT_PLAYER_JOIN_GAME = { name: 'player_join_game' };

export const logEvent = async (firebase, { name, params }) => {
  firebase.analytics().logEvent(name, params);
};

export const getEventFromLocation = location => {
  switch (location) {
    case '/':
      return { name: 'home' };
    case '/host':
      return { name: 'host_home' };
    case '/player':
      return { name: 'player_home' };
    default:
      if (/host\//.test(location)) {
        return { name: 'host_game' };
      } else if (/player\//.test(location)) {
        return { name: 'player_game' };
      }
      return { name: 'other_page' };
  }
};

export const getEventFromState = state => {
  switch (state) {
    case 'question':
      return { name: 'host_question' };
    case 'showResults':
      return { name: 'host_show_restults' };
    default:
      return { name: 'host_other_state', params: { state } };
  }
};

const analytics = {
  EVENT_HOST_CREATE_GAME,
  EVENT_HOST_FINISH_GAME,
  EVENT_HOST_GO_TO_NEXT_QUESTION,
  EVENT_HOST_REMOVE_PLAYER,
  EVENT_HOST_START_GAME,
  EVENT_HOST_SHOW_ANSWER,
  EVENT_LOGIN_ANONYMOUS,
  EVENT_LOGIN_FACEBOOK,
  EVENT_LOGIN_FAILED,
  EVENT_LOGIN_GOOGLE,
  EVENT_LOGOUT,
  EVENT_PLAYER_ANSWER,
  EVENT_PLAYER_JOIN_GAME,
  logEvent,
  getEventFromLocation,
  getEventFromState,
};

export default analytics;
