import {
  axios,
  loginRoute,
  showError,
  forgotPasswordRoute,
  passwordResetRoute,
} from "lib";
import { toast } from "react-toastify";
import {
  autoAuthenticationSuccess,
  getAuthenticatedUser,
  logout,
  setUserLoading,
} from "../Slices/authSlice";

//LOGIN USER
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
      toast.success("You have logged in successfully");
    } catch (error) {
      dispatch(setUserLoading(false));
      toast.error(showError(error));
    }
  };
};

//SAVE TOKEN TO LOCAL STORAGE
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

//LOGOUT TIMER
export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

//AUTO AUTHENTICATE USER WITH VALID TOKEN
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
  dispatch(autoAuthenticationSuccess(data && data));

  const timer = expireDate.getTime() - todaysDate.getTime();
  logOutTimer(dispatch, timer);
};

//FORGOT PASSWORD RESET LINK REQUEST
export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(setUserLoading());
    if (email) {
      try {
        const { url } = forgotPasswordRoute();
        const res = await axios.post(url, { email });
        dispatch(setUserLoading(false));
        if (res.status === 200) toast.success(res.data?.message);
      } catch (error) {
        toast.error(showError(error));
        dispatch(setUserLoading(false));
      }
    }
  };
};

//RESET PASSWORD TOKEN
export const resetPassword = (password, resetToken) => {
  return async (dispatch) => {
    dispatch(setUserLoading());
    if (password) {
      try {
        const { url } = passwordResetRoute(resetToken);
        const res = await axios.post(url, { password });
        dispatch(setUserLoading(false));
        if (res.status === 200) {
          toast.success(
            "Password changed successfully, Please login with the new password"
          );
        }
      } catch (error) {
        toast.error(showError(error));
        dispatch(setUserLoading(false));
      }
    }
  };
};
