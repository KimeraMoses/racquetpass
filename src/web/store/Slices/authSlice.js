import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  status: "",
  message: null,
  updateStatus: "",
  // userInitials: {email: "kimeramoses001@gmail.com", pwd: "Moxhus@2020"},
  userInitials: { email: "kimeramoses001@gmail.com", pwd: "Moxhus@2020" },
  isLoading: false,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    autoAuthenticationSuccess(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    setUserLoading: (state, { payload }) => {
      state.loading = payload;
    },
    getAuthenticatedUser(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = !!state.token;
      state.isLoading = false;
    },
    saveUserInitials: (state, { payload }) => {
      state.userInitials = payload;
    },
    clearUserInitials: (state, { payload }) => {
      state.userInitials = {};
    },
    logout(state) {
      state.user = {};
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("Racquet__AuthToken");
      localStorage.removeItem("Racquet__CurrentUser");
      localStorage.removeItem("_rpn_");
    },
  },
});
const { reducer, actions } = authSlice;

export const {
  autoAuthenticationSuccess,
  setUserLoading,
  getAuthenticatedUser,
  saveUserInitials,
  clearUserInitials,
  logout,
} = actions;

export default reducer;
