import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { sendSurveyResponse } from "web/store/Actions/shopActions";

const Input = ({ label, onChange, placeholder, value, type, error }) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center justify-between">
        <div className="text-[12px] text-[#969696] font-semibold">{label}</div>
        {error && (
          <div className="text-[12px] text-[#E53935] font-semibold">
            {error}
          </div>
        )}
      </div>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className={`h-[58px] border-[1px] px-[16px] rounded-[12px] placeholder:text-[#bababa] text-[#3C3C3C]
          ${error ? "border-[#E40000] bg-[#FFF0F0]" : "border-[#E8E8E8]"}
        `}
      />
    </div>
  );
};

export const Step4 = ({ back, setCookie, setShow }) => {
  const playerEmail = useSelector(
    (state) => state.shop?.order?.delivery_address?.email
  );
  const sport = useSelector((state) => state?.shop?.order?.racquet?.sport);
  const [isLoading, setIsLoading] = useState(false);
  const [ntrp, setNtrp] = useState("");
  const [ntrpError, setNtrpError] = useState("");
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState("");
  const dispatch = useDispatch();

  const serveySubmitHandler = async () => {
    setIsLoading(true);
    const data = {
      competitiveRating: true,
      game: sport && sport,
      ntrpRating: sport === "Squash" ? "" : parseFloat(ntrp),
      utrRating: sport === "Squash" ? "" : parseFloat(utr),
      usSquashRating: sport === "Squash" ? parseFloat(ntrp) : "",
      clubRating: sport === "Squash" ? parseFloat(utr) : "",
      experienceLevel: "",
      email: playerEmail && playerEmail,
    };
    await dispatch(sendSurveyResponse(data, setShow, setCookie));
    setIsLoading(false);
  };

  const lowerLimit1 = sport === "Squash" ? 1.0 : 1.5;
  const lowerLimit2 = sport === "Squash" ? 1.0 : 1.0;
  const upperLimit1 = sport === "Squash" ? 7.5 : 7.0;
  const upperLimit2 = sport === "Squash" ? 7.5 : 16.5;

  return (
    <div>
      <div className="flex gap-[20px] items-center mb-[18px]">
        <BackButton onClick={back} />
        <div className="text-[#545454] text-[18px] ">What is your rating?</div>
      </div>
      {/* Inputs */}
      <Input
        label={`${sport === "Squash" ? "US Squash" : "NTRP"} Rating ${
          sport === "Squash" ? "(1.0 - 7.5)" : "(1.5 - 7.0)"
        }`}
        onChange={(e) => {
          if (
            e.target.value !== "" &&
            (parseFloat(e.target.value) < lowerLimit1 ||
              parseFloat(e.target.value) > upperLimit1)
          ) {
            setNtrpError(
              `Please enter a valid ${
                sport === "Squash" ? "US Squash" : "NTRP"
              } rating`
            );
            setNtrp(e.target.value);
          } else {
            setNtrpError("");
            setNtrp(e.target.value);
            if (!utr) {
              setUtrError("");
            }
          }
        }}
        type="number"
        error={ntrpError}
        value={ntrp}
        placeholder={
          sport === "Squash"
            ? "US Squash (1.0 - 7.5)"
            : "NTRP Rating (1.5 - 7.0)"
        }
      />
      <div className="relative flex items-center mt-[24px] mb-[12px]">
        <div className="flex-grow border-t border-[#e8e8e8]"></div>
        <span className="flex-shrink mx-4 text-[#3C3C3C]">Or</span>
        <div className="flex-grow border-t border-[#e8e8e8]"></div>
      </div>
      <Input
        label={`${sport === "Squash" ? "Club" : "UTR"} Rating ${
          sport === "Squash" ? "(1.0 - 7.5)" : "(1.0 - 16.50)"
        }`}
        onChange={(e) => {
          if (
            e.target.value !== "" &&
            (parseFloat(e.target.value) < lowerLimit2 ||
              parseFloat(e.target.value) > upperLimit2)
          ) {
            setUtrError(
              `Please enter a valid ${
                sport === "Squash" ? "Club" : "UTR"
              } rating`
            );
            setUtr(e.target.value);
          } else {
            setUtrError("");
            setUtr(e.target.value);
            if (!ntrp) {
              setNtrpError("");
            }
          }
        }}
        error={utrError}
        type="number"
        value={utr}
        placeholder={
          sport === "Squash"
            ? "Club Rating (1.0 - 7.5)"
            : "UTR Rating (1.0 - 16.50)"
        }
      />
      <div className="mt-[45px]">
        <SubmitButton
          disabled={(!ntrp && !utr) || ntrpError || utrError || isLoading}
          onClick={serveySubmitHandler}
        >
          {isLoading ? "Sending response..." : "Complete Survey"}
        </SubmitButton>
      </div>
    </div>
  );
};
