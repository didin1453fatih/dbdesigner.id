export default {
  SET_VISIBLE(state, value) {
    state.visible = value;
  },
  SET_STEP(state, value) {
    state.step = value;
  },
  SET_ORIGIN_TITLE(state, value) {
    state.origin_title = value;
  },
  SET_ORIGIN_OWNER(state, value) {
    state.origin_owner = value;
  },
  SET_ORIGIN_SHARE_STATUS(state, value) {
    state.origin_share_status = value;
  },
  SET_ORIGIN_DESCRIPTION(state, value) {
    state.origin_description = value;
  },
  SET_FORKER_TITLE(state, value) {
    state.forker_title = value;
  },
  SET_FORKER_SHARE_STATUS(state, value) {
    state.forker_share_status = value;
  },
  SET_FORKER_DESCRIPTION(state, value) {
    state.forker_description = value;
  },
  SET_LOADING_READ_INFO(state, value) {
    state.loading_read_info = value;
  },
  SET_LOADING_EXECUTE(state, value) {
    state.loading_execute = value;
  }
};
