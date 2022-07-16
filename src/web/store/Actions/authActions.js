import {
  authenticationFail,
  authenticationPending,
  authenticationSuccess,
  autoAuthenticationSuccess,
  forgotPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  logout,
  resetPasswordFail,
  resetPasswordPending,
  resetPasswordSuccess,
} from "../Slices/authSlice";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/v1/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(authenticationFail(error));
      // console.log("login", error);
    }
    const data = await response.json();
    // console.log("data", data);

    dispatch(
      authenticationSuccess({
        user: data.user,
        token: data.token,
      })
    );
    SaveTokenInLocalStorage(dispatch, data);
  };
};

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  logOutTimer(dispatch, userDetails.expiresIn);
  let AuthTokenDetails = {
    token: userDetails.token,
    expiresIn: userDetails.expiresIn,
    expirationtime: userDetails.expirationTime,
  };
  localStorage.setItem("Racquet__AuthToken", JSON.stringify(AuthTokenDetails));
  localStorage.setItem(
    "Racquet__CurrentUser",
    JSON.stringify(userDetails.user)
  );
};

export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem("Racquet__AuthToken");
  const CurrentUser = localStorage.getItem("Racquet__CurrentUser");
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  UserToken = JSON.parse(AuthToken);
  let expireDate = new Date(UserToken.expirationtime);
  let todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }
  let data = {
    token: UserToken.token,
    user: JSON.parse(CurrentUser),
  };
  dispatch(autoAuthenticationSuccess(data));

  const timer = expireDate.getTime() - todaysDate.getTime();
  logOutTimer(dispatch, timer);
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(forgotPasswordPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/v1/forgotPassword`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(forgotPasswordFail(error));
    }
    const data = await response.json();
    dispatch(forgotPasswordSuccess(data));
  };
};

export const passwordReset = (password, resetToken) => {
  return async (dispatch) => {
    dispatch(resetPasswordPending());
    const response = await fetch(
      `${process.env.REACT_APP_BASEURL}/api/v1/resetPassword/${resetToken}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          password,
        }),
        headers: new Headers({
          "Content-type": "application/json",
          apiKey: process.env.REACT_APP_APIKEY,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(resetPasswordFail(error));
    }
    const data = await response.json();
    dispatch(resetPasswordSuccess(data));
  };
};
