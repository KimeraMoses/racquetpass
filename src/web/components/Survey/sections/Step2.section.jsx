import { useSelector } from "react-redux";
import { SubmitButton } from "web/components/Buttons/SubmitButton.component";

export const Step2 = ({ setStep, change }) => {
  const sport = useSelector((state) => state?.shop?.order?.racquet?.sport);

  return (
    <div>
      <div className="mb-[30px] text-[#545454] text-[18px]">
        {sport === "Squash"
          ? "Do you have a competitive squash rating?"
          : "Do you have a competitive tennis rating?"}
      </div>
      <SubmitButton
        onClick={() => {
          change("competitiveRating", "Yes");
          setStep(4);
        }}
        className="mb-[12px]"
      >
        Yes
      </SubmitButton>
      <SubmitButton
        onClick={() => {
          change("competitiveRating", "No");
          setStep(3);
        }}
        outlined
      >
        No
      </SubmitButton>
    </div>
  );
};
