import { useSelector } from "react-redux";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";

export const Step1 = ({ setStep }) => {
  const sport = useSelector((state) => state?.shop?.order?.racquet?.sport);

  return (
    <div>
      <div className="mb-[67px] text-[#545454] text-[18px]">
        Complete this quick survey to view your order details.
      </div>
      <SubmitButton
        onClick={() => {
          if (sport !== "Tennis" && sport !== "Squash") {
            setStep(3);
          } else {
            setStep(2);
          }
        }}
      >
        Start Survey
      </SubmitButton>
    </div>
  );
};
