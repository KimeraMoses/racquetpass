import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BackButton } from "web/components/Buttons/BackButton.component";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";
import { sendSurveyResponse } from "web/store/Actions/shopActions";

const Option = ({ label, description, active, onClick }) => {
  return (
    <div
      className={`p-[16px] h-[52px] md:h-[80px] flex items-center justify-start rounded-[12px] border-[1px] cursor-pointer ${
        !active
          ? "bg-[#ffffff] border-[#e8e8e8]"
          : "bg-[#EAEDFF] border-[#304FFE]"
      }`}
      onClick={onClick}
    >
      <div>
        <div className="text-[18px] text-[#3c3c3c]">{label}</div>
        <div className="text-[14px] text-[#9A9A9A] hidden md:block">
          {description}
        </div>
      </div>
    </div>
  );
};

export const Step3 = ({ setStep, setShow, setCookie }) => {
  const playerEmail = useSelector(
    (state) => state.shop?.order?.delivery_address?.phone_number
  );
  const sport = useSelector((state) => state?.shop?.order?.racquet?.sport);
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();

  const serveySubmitHandler = async () => {
    setIsLoading(true);
    const data = {
      competitiveRating: false,
      game: sport && sport,
      experienceLevel: active,
      email: playerEmail && playerEmail,
    };
    await dispatch(sendSurveyResponse(data, setShow, setCookie));
    setIsLoading(false);
  };

  const options = [
    {
      label: "Just Started",
      description: "I've only played a few times.",
      active: active === "Just Started",
    },
    {
      label: "Beginner",
      description: "I'm enthusiastically picking up the game!",
      active: active === "Beginner",
    },
    {
      label: "Intermediate",
      description: "I've played in middle school or high school.",
      active: active === "Intermediate",
    },
    {
      label: "Elite",
      description: "I've played in regular tournaments or in college.",
      active: active === "Elite",
    },
    {
      label: "Pro",
      description: "I've played professionally.",
      active: active === "Pro",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-[46px_4fr] gap-[20px] items-center mb-[18px]">
        <BackButton
          onClick={() => {
            if (sport !== "Tennis" && sport !== "Squash") {
              setStep(1);
            } else {
              setStep(2);
            }
          }}
        />
        <div className="text-[#545454] text-[18px] ">
          What best describes your experience level?
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        {options.map((option, index) => (
          <Option
            key={index}
            label={option.label}
            description={option.description}
            active={option.active}
            onClick={() => setActive(option.label)}
          />
        ))}
      </div>
      <div className="mt-[45px]">
        <SubmitButton
          disabled={!active || isLoading}
          onClick={serveySubmitHandler}
        >
          {isLoading ? "Sending response..." : "Complete Survey"}
        </SubmitButton>
      </div>
    </div>
  );
};
