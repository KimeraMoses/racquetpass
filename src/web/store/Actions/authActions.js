import { axios, loginRoute, showError } from "lib";
import { toast } from "react-toastify";
import {
  autoAuthenticationSuccess,
  getAuthenticatedUser,
  logout,
  setUserLoading,
} from "../Slices/authSlice";

export const login = (data) => {
  return async (dispatch) => {
    dispatch(setUserLoading(true));
    try {
      const { url } = loginRoute();
      const res = await axios.post(url, data);
      dispatch(setUserLoading(false));
      dispatch(
        getAuthenticatedUser({ user: res.data.user, token: res.data.token })
      );
      SaveTokenInLocalStorage(dispatch, res.data);
      toast.success("You have logged in successfuly");
    } catch (error) {
      dispatch(setUserLoading(false));
      toast.error(showError(error));

      // toast.error(`Failed to login, ${error.response?.data?.message}`);
    }
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

// export const forgotPassword = (email) => {
//   return async (dispatch) => {
//     dispatch(forgotPasswordPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/forgotPassword`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           email,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           apiKey: process.env.REACT_APP_APIKEY,
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(forgotPasswordFail(error));
//     }
//     const data = await response.json();
//     dispatch(forgotPasswordSuccess(data));
//   };
// };

// export const passwordReset = (password, resetToken) => {
//   return async (dispatch) => {
//     dispatch(resetPasswordPending());
//     const response = await fetch(
//       `${process.env.REACT_APP_BASEURL}/api/v1/resetPassword/${resetToken}`,
//       {
//         method: "PATCH",
//         body: JSON.stringify({
//           password,
//         }),
//         headers: new Headers({
//           "Content-type": "application/json",
//           apiKey: process.env.REACT_APP_APIKEY,
//         }),
//       }
//     );
//     if (!response.ok) {
//       const error = await response.json();
//       dispatch(resetPasswordFail(error));
//     }
//     const data = await response.json();
//     dispatch(resetPasswordSuccess(data));
//   };
// };
