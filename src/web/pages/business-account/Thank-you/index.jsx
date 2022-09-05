import { useNavigate } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearUserInitials } from "web/store/Slices/authSlice";
import { login } from "web/store/Actions/authActions";
import Recaptcha from "web/components/Google-Recaptcha/Recaptcha";

const ThankYou = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { email, pwd } = useSelector((state) => state.auth.userInitials);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refRecaptcha = useRef(null);

  const formSubmitHandler = async () => {
    setIsLoading(true);
    const data = {
      email: email,
      password: pwd,
    };
    if (email && pwd) {
      try {
        await dispatch(login(data));
        setIsLoading(false);
        navigate("/tasks");
      } catch (err) {
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
          className="bg-[#304ffe] rounded-[12px] w-full py-[16px] text-[#fff] text-[18px] font-medium disabled:opacity-40 disabled:cursor-auto"
          onClick={formSubmitHandler}
          disabled={isLoading}
        >
          {isLoading ? "Redirecting..." : "Go to your account"}
        </button>
      </div>
      <Recaptcha refRecaptcha={refRecaptcha} />
    </div>
  );
};
export default withNamespaces()(ThankYou);
