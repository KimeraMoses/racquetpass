import { useNavigate } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearUserInitials } from "web/store/Slices/authSlice";
import { login } from "web/store/Actions/authActions";

const ThankYou = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { email, pwd } = useSelector((state) => state.auth.userInitials);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formSubmitHandler = async () => {
    setIsLoading(true);
    if (email && pwd) {
      try {
        await dispatch(login(email, pwd));
        setIsLoading(false);
        navigate("/tasks");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        if (window.navigator.onLine) {
          navigate("/login");
          return toast.error(
            "Oooops, Failed to redirect to account, Please login to proceed"
          );
        }
        toast.error("Failed to redirect, Please check your internet!");
      }
      dispatch(clearUserInitials());
    } else {
      dispatch(clearUserInitials());
      navigate("/login");
    }
  };

  return (
    <div className="mt-[170px] flex flex-col gap-[66px] items-center px-[20px] max-w-[450px] m-[0_auto]">
      <div className="flex flex-col gap-[14px] items-center px-[15px]">
        <div className="text-[#3C3C3C] text-[24px] font-bold">Thank you!</div>
        <div className="text-[#545454] text-[18px] font-normal text-center">
          Thank you for signing up with RacquetPass! We sent you an email to
          help you set up your account.
        </div>
      </div>
      <div className="w-full">
        <button
          className="bg-[#304ffe] rounded-[12px] w-full py-[16px] text-[#fff] text-[18px] font-medium"
          onClick={formSubmitHandler}
        >
          {isLoading ? "Redirecting..." : "Go to your account"}
        </button>
      </div>
    </div>
  );
};
export default withNamespaces()(ThankYou);
